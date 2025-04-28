import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a reliable default
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ChainLink - Supply Chain Management',
  description: 'Track your products through the supply chain efficiently.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans antialiased flex flex-col h-full bg-secondary`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
