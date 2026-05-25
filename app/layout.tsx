import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display'
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Rajshekar Badiger | Cinematic Developer Portfolio',
  description:
    'I am Rajshekar Badiger, a Computer Science (AI & ML) undergraduate at CMR University who enjoys turning complex ideas into elegant products. My work spans React and Next.js interfaces, Node.js and Express backends, and practical AI problem solving. I care about performance, clarity, and building systems that feel as polished as they are technically sound.',
  metadataBase: new URL('https://rajshekarbadiger.dev')
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}