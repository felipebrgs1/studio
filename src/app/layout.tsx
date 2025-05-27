import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import { GA_TRACKING_ID } from '@/lib/config';
import { Toaster } from "@/components/ui/toaster"; // Added for potential future use, good practice

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Scroll Insights',
  description: 'Explore blog posts and analyze user interactions with Google Analytics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        {/* Conditionally render GoogleAnalytics only if GA_TRACKING_ID is set */}
        {GA_TRACKING_ID && <GoogleAnalytics />}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
