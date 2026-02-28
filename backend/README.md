# AI Translator API Service

A production-grade backend service for translating full articles using OpenAI or Google Gemini APIs. Built with Fastify, LangChain.js, and TypeScript.

## Features

- **Multi-language Translation**: Translate one article to multiple target languages in a single API call
- **Provider Switching**: Support for OpenAI and Google Gemini with easy switching via config
- **Structured Output**: Reliable parsing using Zod schemas and LangChain structured output
- **Retry Logic**: Built-in retries for network errors and parsing failures
- **Cost Tracking**: Token counting and cost estimation
- **Type Safety**: Full TypeScript with strict mode

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

Edit `.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
PORT=3000
HOST=0.0.0.0
```

### 3. Run the Server

Development mode (with hot reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

### 4. Deploy to Vercel

This project is configured for Vercel serverless deployment.

**Prerequisites:**
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Vercel CLI installed: `npm i -g vercel`

**Deployment Steps:**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

3. **Set Environment Variables:**
   In the Vercel dashboard (or via CLI):
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add GOOGLE_API_KEY
   ```
   Or set them in the Vercel dashboard: Project Settings → Environment Variables

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

**API Endpoints on Vercel:**
- `POST /api/translate` - Translate articles
- `GET /api/health` - Health check
- `POST /translate` - Alias for `/api/translate` (via rewrite)
- `GET /health` - Alias for `/api/health` (via rewrite)

**Note:** The Fastify server (`src/index.ts`) is kept for local development. Vercel uses the serverless functions in the `api/` directory.

## API Usage

### POST /translate

Translate an article to multiple target languages.

**Request Body:**
```json
{
  "text": "# Article Title\n\nFull article content in Markdown...",
  "sourceLang": "en",
  "targetLanguages": ["fr", "es", "de", "it", "pt"],
  "provider": "openai",
  "model": "gpt-4o-mini",
  "tone": "journalistic",
  "articleType": "news"
}
```

**Response:**
```json
{
  "translations": {
    "fr": "# Titre de l'article\n\nContenu traduit...",
    "es": "# Título del artículo\n\nContenido traducido...",
    "de": "# Artikel-Titel\n\nÜbersetzter Inhalt...",
    "it": "# Titolo dell'articolo\n\nContenuto tradotto...",
    "pt": "# Título do artigo\n\nConteúdo traduzido..."
  },
  "usage": {
    "inputTokens": 1250,
    "outputTokens": 3200,
    "estimatedCostUsd": 0.0021
  }
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Full article text (plain or Markdown) |
| `sourceLang` | string | Yes | Source language code (e.g., "en", "fr") |
| `targetLanguages` | string[] | Yes | Array of target language codes |
| `provider` | "openai" \| "google" | Yes | LLM provider to use |
| `model` | string | No | Model override (defaults: `gpt-4o-mini` for OpenAI, `gemini-2.0-flash` for Google) |
| `tone` | string | No | Translation tone (e.g., "journalistic", "formal", "casual") |
| `articleType` | string | No | Article type (e.g., "news", "blog", "technical") |

## Architecture

The service uses **LangChain LCEL** (LangChain Expression Language) for orchestration:

- **Linear Flow**: Input → Prompt → LLM → Structured Output Parser → Response
- **Built-in Retries**: LangChain handles network/rate-limit errors automatically
- **Parsing Retries**: Wrapper retry loop for parsing failures with exponential backoff
- **Provider Abstraction**: Factory pattern for easy provider switching

### Project Structure

```
src/
├── index.ts                 # Fastify server setup
├── routes/
│   └── translate.ts        # POST /translate handler
├── services/
│   └── translation.ts      # Core translation logic (LangChain chain)
├── providers/
│   ├── factory.ts          # Provider factory
│   └── types.ts            # Provider types
├── prompts/
│   └── translation.ts      # Prompt builders
└── schemas.ts              # Zod schemas
```

## Cost Estimation

The service includes cost estimation based on token usage. Current rates (as of 2024):

**OpenAI:**
- `gpt-4o-mini`: $0.15/$0.60 per 1M tokens (input/output)
- `gpt-4o`: $2.50/$10.00 per 1M tokens
- `gpt-4-turbo`: $10.00/$30.00 per 1M tokens

**Google:**
- `gemini-2.0-flash`: $0.075/$0.30 per 1M tokens
- `gemini-1.5-pro`: $1.25/$5.00 per 1M tokens
- `gemini-1.5-flash`: $0.075/$0.30 per 1M tokens

*Note: Update rates in `src/services/translation.ts` as needed.*

## Error Handling

- **400 Bad Request**: Validation errors (missing/invalid parameters)
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Service errors (API key issues, LLM errors, etc.)

## Future Enhancements

The codebase is structured to allow easy migration to **LangGraph** if more sophisticated retry logic or multi-provider fallback chains are needed. The current LCEL implementation is optimal for this linear translation task.

## License

MIT
