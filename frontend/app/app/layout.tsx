import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://translate.devagn.com';

export const metadata: Metadata = {
  title: 'Translation App - Translate with AI',
  description: 'Translate articles, documents, and content to multiple languages using AI-powered translation. Support for OpenAI and Google Gemini with 120+ languages.',
  keywords: [
    'AI translation tool',
    'online translation',
    'document translation',
    'article translation',
    'multilingual translation',
    'OpenAI translation',
    'Google Gemini translation',
  ],
  openGraph: {
    title: 'LinguaAI Translation App - Translate with AI',
    description: 'Translate articles, documents, and content to multiple languages using AI-powered translation.',
    url: `${siteUrl}/app`,
    siteName: 'LinguaAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinguaAI Translation App - Translate with AI',
    description: 'Translate articles, documents, and content to multiple languages using AI-powered translation.',
  },
  alternates: {
    canonical: `${siteUrl}/app`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
