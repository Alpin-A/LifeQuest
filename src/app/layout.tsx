import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeQuest Kingston - Gamify Your Life',
  description: 'A gamified life management platform where self-improvement, social competition, and civic duty intersect.',
  keywords: ['productivity', 'gamification', 'habit tracker', 'Kingston', 'civic engagement'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
