import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LANGUAGES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function getLanguageName(code: string): string {
  const language = LANGUAGES.find((lang) => lang.code === code);
  return language?.name || code.toUpperCase();
}

export function getLanguageNative(code: string): string {
  const language = LANGUAGES.find((lang) => lang.code === code);
  return language?.native || code.toUpperCase();
}
