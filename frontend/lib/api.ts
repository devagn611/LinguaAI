import type { TranslateRequest, TranslateResponse, ApiError } from '@/types/translation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function translateArticle(
  request: TranslateRequest
): Promise<TranslateResponse> {
  const url = `${API_URL}/translate`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      error: 'Unknown error',
      message: `HTTP ${response.status}: ${response.statusText}`,
    }));

    throw new Error(error.message || error.error || 'Translation failed');
  }

  const data: TranslateResponse = await response.json();
  return data;
}

export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  const url = `${API_URL}/health`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Health check failed');
  }

  return response.json();
}
