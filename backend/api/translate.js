import { translateRequestSchema } from '../src/schemas';
import { translateArticle } from '../src/services/translation';
/**
 * POST /api/translate handler for Vercel serverless function
 *
 * Validates the request, calls the translation service, and returns the result.
 * Handles errors appropriately (400 for validation, 500 for service errors).
 */
export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are supported',
        });
        return;
    }
    try {
        // Validate request body with Zod
        const validationResult = translateRequestSchema.safeParse(req.body);
        if (!validationResult.success) {
            const errors = validationResult.error.errors
                .map((err) => `${err.path.join('.')}: ${err.message}`)
                .join(', ');
            res.status(400).json({
                error: 'Validation failed',
                details: errors,
            });
            return;
        }
        const validRequest = validationResult.data;
        // Log the request (without sensitive data) - Vercel will handle logging
        console.log('Translation request received', {
            provider: validRequest.provider,
            model: validRequest.model,
            sourceLang: validRequest.sourceLang,
            targetLanguages: validRequest.targetLanguages,
            textLength: validRequest.text.length,
        });
        // Call translation service
        const result = await translateArticle(validRequest);
        // Log success
        console.log('Translation completed successfully', {
            provider: validRequest.provider,
            languagesTranslated: Object.keys(result.translations).length,
            inputTokens: result.usage.inputTokens,
            outputTokens: result.usage.outputTokens,
            estimatedCost: result.usage.estimatedCostUsd,
        });
        // Return success response
        res.status(200).json(result);
    }
    catch (error) {
        // Handle different error types
        const errorMessage = error instanceof Error ? error.message : String(error);
        // Check if it's a known error type
        if (errorMessage.includes('API key') || errorMessage.includes('environment variable')) {
            console.error('Configuration error:', errorMessage);
            res.status(500).json({
                error: 'Service configuration error',
                message: 'API key is missing or invalid. Please check your environment variables.',
            });
            return;
        }
        if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
            console.error('Rate limit error:', errorMessage);
            res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'Too many requests. Please try again later.',
            });
            return;
        }
        // Generic service error
        console.error('Translation service error:', errorMessage);
        res.status(500).json({
            error: 'Translation failed',
            message: errorMessage,
        });
    }
}
//# sourceMappingURL=translate.js.map