import { z } from 'zod';

// "Request schema for POST /translate endpoint"
//  * 
//  * @param text - The text to translate
//  * @param sourceLang - The source language code
//  * @param targetLanguages - The target language codes
//  * @param provider - The provider to use
//  * @param model - The model to use
//  * @param tone - The tone to use
//  * @param articleType - The article type
//  */
export const translateRequestSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty'),
  sourceLang: z.string().min(2, 'Source language code must be at least 2 characters'),
  targetLanguages: z.array(z.string().min(2)).min(1, 'At least one target language is required'),
  provider: z.enum(['openai', 'google'], {
    errorMap: () => ({ message: 'Provider must be either "openai" or "google"' }),
  }),
  model: z.string().optional(),
  tone: z.string().optional(),
  articleType: z.string().optional(),
});

export type TranslateRequest = z.infer<typeof translateRequestSchema>;


export const translateResponseSchema = z.object({
  translations: z.record(z.string(), z.string()),
  usage: z.object({
    inputTokens: z.number(),
    outputTokens: z.number(),
    estimatedCostUsd: z.number(),
  }),
});

export type TranslateResponse = z.infer<typeof translateResponseSchema>;


export const llmOutputSchema = z.object({
  translations: z.record(z.string(), z.string()).describe(
    'A JSON object where keys are language codes (e.g., "de", "nl") and values are the translated content for each language'
  ),
});

export type LLMOutput = z.infer<typeof llmOutputSchema>;
