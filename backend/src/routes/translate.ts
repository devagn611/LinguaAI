import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { translateRequestSchema, type TranslateRequest } from '../schemas';
import { translateArticle } from '../services/translation';

interface TranslateRequestBody {
  text: string;
  sourceLang: string;
  targetLanguages: string[];
  provider: 'openai' | 'google';
  model?: string;
  tone?: string;
  articleType?: string;
}

export async function translateHandler(
  request: FastifyRequest<{ Body: TranslateRequestBody }>,
  reply: FastifyReply
): Promise<void> {
  try {
    const validationResult = translateRequestSchema.safeParse(request.body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      
      await reply.code(400).send({
        error: 'Validation failed',
        details: errors,
      });
      return;
    }
    
    const validRequest: TranslateRequest = validationResult.data;
    
    request.log.info({
      provider: validRequest.provider,
      model: validRequest.model,
      sourceLang: validRequest.sourceLang,
      targetLanguages: validRequest.targetLanguages,
      textLength: validRequest.text.length,
    }, 'Translation request received');
    
    const result = await translateArticle(validRequest);
    
    // request.log.info({
    //   provider: validRequest.provider,
    //   languagesTranslated: Object.keys(result.translations).length,
    //   inputTokens: result.usage.inputTokens,
    //   outputTokens: result.usage.outputTokens,
    //   estimatedCost: result.usage.estimatedCostUsd,
    // }, 'Translation completed successfully');
    
    await reply.code(200).send(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('API key') || errorMessage.includes('environment variable')) {
      request.log.error({ error: errorMessage }, 'Configuration error');
      await reply.code(500).send({
        error: 'Service configuration error',
        message: 'API key is missing or invalid. Please check your environment variables.',
      });
      return;
    }
    
    if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
      request.log.error({ error: errorMessage }, 'Rate limit error');
      await reply.code(429).send({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
      });
      return;
    }
    
    request.log.error({ error: errorMessage }, 'Translation service error');
    await reply.code(500).send({
      error: 'Translation failed',
      message: errorMessage,
    });
  }
}

export async function registerTranslateRoute(fastify: FastifyInstance): Promise<void> {
  fastify.post('/translate', translateHandler);
}
