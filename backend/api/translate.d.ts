import type { VercelRequest, VercelResponse } from '@vercel/node';
/**
 * POST /api/translate handler for Vercel serverless function
 *
 * Validates the request, calls the translation service, and returns the result.
 * Handles errors appropriately (400 for validation, 500 for service errors).
 */
export default function handler(req: VercelRequest, res: VercelResponse): Promise<void>;
//# sourceMappingURL=translate.d.ts.map