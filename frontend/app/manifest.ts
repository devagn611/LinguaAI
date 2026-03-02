import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LinguaAI - AI-Powered Translation',
    short_name: 'LinguaAI',
    description: 'Translate articles, documents, and content across 120+ languages with AI-powered translation.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#ffa500',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['productivity', 'utilities', 'translation'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  };
}
