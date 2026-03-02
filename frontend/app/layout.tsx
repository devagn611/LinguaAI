import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import './globals.css';

const ubuntu = Ubuntu({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
  variable: '--font-ubuntu' 
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://translate.devagn.com';
const siteName = 'LinguaAI';
const siteDescription = 'Translate articles, documents, and content across 120+ languages with AI-powered translation. Support for OpenAI and Google Gemini with cultural nuance and context awareness.';
const siteKeywords = [
  'AI translation',
  'multilingual translation',
  'OpenAI translation',
  'Google Gemini translation',
  'document translation',
  'article translation',
  'cultural translation',
  'context-aware translation',
  'language translation service',
  'AI-powered translation',
  'translation API',
  '120+ languages',
  'enterprise translation',
  'global translation',
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LinguaAI - AI-Powered Translation for 120+ Languages',
    template: '%s | LinguaAI',
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'LinguaAI' }],
  creator: 'LinguaAI',
  publisher: 'LinguaAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'LinguaAI - AI-Powered Translation for 120+ Languages',
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LinguaAI - AI-Powered Translation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinguaAI - AI-Powered Translation for 120+ Languages',
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: '@devagnmaniya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
  classification: 'Translation Service',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
};

import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ubuntu.variable}>
      <body className="antialiased bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
