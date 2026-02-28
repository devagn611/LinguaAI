export type Provider = 'openai' | 'google';

export interface TranslateRequest {
  text: string;
  sourceLang: string;
  targetLanguages: string[];
  provider: Provider;
  model?: string;
  tone?: string;
  articleType?: string;
}

export interface TranslateResponse {
  translations: Record<string, string>;
  usage: {
    inputTokens: number;
    outputTokens: number;
    estimatedCostUsd: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
  details?: string;
}
