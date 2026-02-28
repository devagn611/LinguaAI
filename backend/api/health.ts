import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * GET /api/health handler for Vercel serverless function
 * 
 * Simple health check endpoint to verify the API is running.
 */
export default function handler(
  req: VercelRequest,
  res: VercelResponse
): void {
  if (req.method !== 'GET') {
    res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are supported',
    });
    return;
  }

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ai-translator',
  });
}
