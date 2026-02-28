import { StructuredOutputParser } from '@langchain/core/output_parsers';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { TranslateRequest, TranslateResponse, LLMOutput } from '../schemas.js';
import { llmOutputSchema } from '../schemas.js';
import { createTranslationPrompt } from '../prompts/translation.js';
import { createModel } from '../providers/factory.js';

/**
 * Cost per million tokens (as of 2024, update as needed)
 * These are rough estimates - actual costs may vary by model and region
 */
const COST_PER_MILLION_TOKENS = {
  openai: {
    'gpt-4o-mini': { input: 0.15, output: 0.6 }, // $0.15/$0.60 per 1M tokens
    'gpt-4o': { input: 2.5, output: 10.0 },
    'gpt-4-turbo': { input: 10.0, output: 30.0 },
    default: { input: 0.15, output: 0.6 },
  },
  google: {
    'gemini-2.0-flash': { input: 0.075, output: 0.3 }, // $0.075/$0.30 per 1M tokens
    'gemini-1.5-pro': { input: 1.25, output: 5.0 },
    'gemini-1.5-flash': { input: 0.075, output: 0.3 },
    default: { input: 0.075, output: 0.3 },
  },
} as const;

/**
 * Validates and normalizes translations from LLM output
 * 
 * @param translations - The translations object from LLM with language codes as keys
 * @param targetLanguages - Expected target language codes
 * @returns Object mapping language codes to translated content
 */
function normalizeTranslations(
  translations: Record<string, string>,
  targetLanguages: string[]
): Record<string, string> {
  const normalized: Record<string, string> = {};
  
  // Copy translations from LLM output, ensuring all target languages are present
  for (const lang of targetLanguages) {
    const langLower = lang.toLowerCase();
    if (langLower in translations) {
      normalized[langLower] = translations[langLower];
    } else {
      // If language code not found, try to find it with different casing
      const found = Object.keys(translations).find(
        (key) => key.toLowerCase() === langLower
      );
      normalized[langLower] = found ? translations[found] : '';
    }
  }
  
  return normalized;
}

/**
 * Helper to create parser - breaks TypeScript's deep type inference chain
 * This avoids "Type instantiation is excessively deep" error with z.record()
 * The issue occurs because z.record() creates deeply nested types that TypeScript
 * struggles to infer when used with StructuredOutputParser.fromZodSchema()
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createOutputParser(): any {
  // Type assertion bypasses TypeScript's deep type inference
  // Runtime behavior is correct - this is purely a TypeScript limitation
  return StructuredOutputParser.fromZodSchema(llmOutputSchema as any);
}

/**
 * Estimates token usage and cost
 * 
 * @param model - The chat model instance
 * @param inputText - Input text
 * @param outputText - Output text
 * @param provider - Provider name
 * @param modelName - Model name
 * @returns Usage statistics
 */
async function calculateUsage(
  model: BaseChatModel,
  inputText: string,
  outputText: string,
  provider: 'openai' | 'google',
  modelName: string
): Promise<{ inputTokens: number; outputTokens: number; estimatedCostUsd: number }> {
  // Use LangChain's token counting if available
  let inputTokens = 0;
  let outputTokens = 0;
  
  try {
    // Try to get token count from model if it supports it
    if ('getNumTokens' in model && typeof model.getNumTokens === 'function') {
      inputTokens = await model.getNumTokens(inputText);
      outputTokens = await model.getNumTokens(outputText);
    } else {
      // Fallback: rough estimation (1 token ≈ 4 characters for English)
      inputTokens = Math.ceil(inputText.length / 4);
      outputTokens = Math.ceil(outputText.length / 4);
    }
  } catch (error) {
    // Fallback estimation
    console.warn('Token counting failed, using estimation:', error);
    inputTokens = Math.ceil(inputText.length / 4);
    outputTokens = Math.ceil(outputText.length / 4);
  }
  
  // Get cost rates
  const providerCosts = COST_PER_MILLION_TOKENS[provider];
  const modelCosts = providerCosts[modelName as keyof typeof providerCosts] || providerCosts.default;
  
  const estimatedCostUsd =
    (inputTokens / 1_000_000) * modelCosts.input +
    (outputTokens / 1_000_000) * modelCosts.output;
  
  return {
    inputTokens,
    outputTokens,
    estimatedCostUsd: Math.round(estimatedCostUsd * 10000) / 10000, // Round to 4 decimal places
  };
}

/**
 * Core translation service using LangChain LCEL
 * 
 * This function:
 * 1. Creates the appropriate LLM model based on provider
 * 2. Builds the prompt chain
 * 3. Invokes the LLM with structured output parsing
 * 4. Parses and splits translations by language
 * 5. Calculates usage and cost
 * 
 * @param request - Translation request parameters
 * @returns Translation response with all translations and usage stats
 */
export async function translateArticle(
  request: TranslateRequest
): Promise<TranslateResponse> {
  const maxRetries = 3;
  let lastError: Error | null = null;
  
  const model = createModel(request.provider, request.model);
  const modelName = request.model || (request.provider === 'openai' ? 'gpt-4o-mini' : 'gemini-2.5-flash');
  
  const prompt = createTranslationPrompt(request);
  
  const parser = createOutputParser();
  
  const chain = prompt.pipe(model).pipe(parser);
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await chain.invoke({}) as LLMOutput;
      
      const translations = normalizeTranslations(
        result.translations,
        request.targetLanguages
      );
      
      const missingLanguages = request.targetLanguages.filter(
        (lang: string) => !translations[lang.toLowerCase()] || translations[lang.toLowerCase()].trim() === ''
      );
      
      if (missingLanguages.length > 0 && attempt < maxRetries) {
        throw new Error(
          `Missing translations for languages: ${missingLanguages.join(', ')}`
        );
      }
      
      const isSimpleText = request.text.trim().length < 200 && !request.text.includes('\n');
      
      let usage;
      if (isSimpleText) {
        const estimatedInputTokens = Math.ceil((request.text.length + 200) / 4); // ~200 chars for prompt overhead
        const estimatedOutputTokens = Math.ceil(JSON.stringify(result.translations).length / 4);
        const providerCosts = COST_PER_MILLION_TOKENS[request.provider];
        const modelCosts = (providerCosts[modelName as keyof typeof providerCosts] as { input: number; output: number }) || providerCosts.default;
        const estimatedCostUsd = 
          (estimatedInputTokens / 1_000_000) * modelCosts.input +
          (estimatedOutputTokens / 1_000_000) * modelCosts.output;
        
        usage = {
          inputTokens: estimatedInputTokens,
          outputTokens: estimatedOutputTokens,
          estimatedCostUsd: Math.round(estimatedCostUsd * 10000) / 10000,
        };
      } else {
        const formattedMessages = await prompt.formatMessages({});
        const fullInputText = formattedMessages
          .map((msg: { content?: string | unknown }) => (typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)))
          .join('\n');
        const fullOutputText = JSON.stringify(result.translations);
        
        usage = await calculateUsage(
          model,
          fullInputText,
          fullOutputText,
          request.provider,
          modelName
        );
      }
      
      return {
        translations,
        usage,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (
        attempt < maxRetries &&
        (lastError.message.includes('parsing') ||
          lastError.message.includes('Missing translations'))
      ) {
        console.warn(
          `Translation attempt ${attempt} failed, retrying...`,
          lastError.message
        );
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        continue;
      }
      
      if (attempt === maxRetries) {
        throw new Error(
          `Translation failed after ${maxRetries} attempts: ${lastError.message}`
        );
      }
    }
  }
  
  throw lastError || new Error('Translation failed for unknown reason');
}
