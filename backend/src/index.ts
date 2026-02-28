import Fastify, { type FastifyRequest, type FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { registerTranslateRoute } from './routes/translate.js';

dotenv.config();


const PORT = parseInt(process.env.PORT || '8080', 10);
const HOST = process.env.HOST || '0.0.0.0';


async function createServer() {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info'
    },
  });

  await fastify.register(cors, {
    origin: true,
    credentials: true,
  });

  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  await registerTranslateRoute(fastify);

  fastify.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
    request.log.error({ error }, 'Unhandled error');
    reply.code(500).send({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred',
    });
  });

  fastify.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply.code(404).send({
      error: 'Not found',
      message: `Route ${request.method} ${request.url} not found`,
    });
  });

  return fastify;
}

async function start() {
  try {
    const server = await createServer();
    
    await server.listen({ port: PORT, host: HOST });
    
    console.log(`🚀 Translation API server running on http://${HOST}:${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

start();
