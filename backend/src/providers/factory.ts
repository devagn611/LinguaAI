import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { Provider } from './types';


const DEFAULT_MODELS: Record<Provider, string> = {
  openai: 'gpt-4o-mini',
  google: 'gemini-2.5-flash',
};

export function createModel(
  provider: Provider,
  model?: string
): BaseChatModel {
  const selectedModel = model?.trim() || DEFAULT_MODELS[provider];
  
  if (!selectedModel || selectedModel.length === 0) {
    throw new Error(`Model name is required for provider: ${provider}`);
  }
  
  const temperature = 0.1;

  switch (provider) {
    case 'openai': {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY environment variable is not set');
      }

      const config = {
        model: selectedModel,
        temperature,
        openAIApiKey: apiKey,
        maxRetries: 3,
      };
      return new ChatOpenAI(config) as BaseChatModel;
    }

    case 'google': {
      const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error(
          'GOOGLE_API_KEY or GEMINI_API_KEY environment variable is not set'
        );
      }

      const config = {
        model: selectedModel,
        temperature,
        apiKey,
        maxRetries: 3,
      };
      return new ChatGoogleGenerativeAI(config) as BaseChatModel;
    }

    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
