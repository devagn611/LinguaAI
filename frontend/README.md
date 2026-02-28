# LinguaAI Frontend

A modern, production-ready frontend for the LinguaAI translation service. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern, Framer Workshop-inspired UI design
- 🚀 Built with Next.js 15 (App Router)
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎯 Type-safe with TypeScript
- ♿ Accessible and keyboard-friendly
- 🎭 Multiple AI provider support (OpenAI, Google)
- 📊 Usage statistics and cost tracking
- 📋 Copy and download translations
- 🔄 Error handling with retry mechanisms

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Backend API running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production, set this to your deployed backend URL.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── translation/       # Translation-specific components
│   └── ErrorBoundary.tsx  # Error boundary
├── lib/                   # Utilities and API client
├── types/                 # TypeScript types
└── public/               # Static assets
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (required)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

The project includes a `vercel.json` configuration file.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Build

```bash
npm run build
npm start
```

## Development

```bash
npm run dev      # Start dev server
npm run lint     # Run ESLint
npm run type-check  # TypeScript type checking
```

## Features in Detail

### Translation Form
- Large text input with character counter
- Source language selector
- Multi-select target languages with search
- Provider selection (OpenAI/Google)
- Model selection
- Advanced options (tone, article type)

### Results Display
- Tabbed interface for multiple translations
- Markdown rendering
- Copy to clipboard
- Download as markdown file
- Usage statistics (tokens, cost)

### Error Handling
- Error boundaries for React errors
- User-friendly error messages
- Retry mechanisms
- Network error handling

## Technologies

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering

## License

MIT
