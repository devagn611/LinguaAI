export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
] as const;

export const POPULAR_LANGUAGES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar'];

export const PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: [
      { value: 'gpt-4o-mini', label: 'GPT-4o Mini', cost: 'Low' },
      { value: 'gpt-4o', label: 'GPT-4o', cost: 'Medium' },
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', cost: 'High' },
    ],
    defaultModel: 'gpt-4o-mini',
  },
  google: {
    name: 'Google',
    models: [
      { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', cost: 'Low' },
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', cost: 'Low' },
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', cost: 'Medium' },
    ],
    defaultModel: 'gemini-2.0-flash',
  },
} as const;

export const TONES = [
  'journalistic',
  'formal',
  'casual',
  'academic',
  'creative',
  'technical',
  'conversational',
] as const;

export const ARTICLE_TYPES = [
  'news',
  'blog',
  'technical',
  'marketing',
  'documentation',
  'literary',
] as const;
