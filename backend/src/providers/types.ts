import type { BaseChatModel } from '@langchain/core/language_models/chat_models';

export type Provider = 'openai' | 'google';

export interface ProviderConfig {
  provider: Provider;
  model?: string;
}

export function isChatModel(model: unknown): model is BaseChatModel {
  return (
    typeof model === 'object' &&
    model !== null &&
    'invoke' in model &&
    typeof (model as BaseChatModel).invoke === 'function'
  );
}
