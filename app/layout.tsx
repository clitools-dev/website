// Removed "use client"; - this is now a Server Component again

import type { Metadata, Viewport } from "next";
import "./globals.css"; // Corrected path for globals.css
// Removed: import { Auth0Provider } from '@auth0/auth0-react';
import AuthProvider from "./auth-provider"; // Import the new AuthProvider client component
import localFont from 'next/font/local'

// Use locally hosted Inter font
const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: "CLI Tools - Discover the Best Command-Line Tools",
  description: "A curated collection of modern CLI tools for developers. Find, compare, and discover the best command-line tools for your development workflow.",
  keywords: "CLI tools, command line tools, developer tools, terminal tools, command line interface, developer utilities",
  authors: [{ name: "CLI Tools Team" }],
  creator: "CLI Tools Team",
  publisher: "CLI Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://clitools.dev'),
  openGraph: {
    title: "CLI Tools - Discover the Best Command-Line Tools",
    description: "A curated collection of modern CLI tools for developers. Find, compare, and discover the best command-line tools for your development workflow.",
    type: "website",
    locale: "en_US",
    siteName: "CLI Tools",
    images: [
      {
        url: 'https://clitools.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CLI Tools - Command Line Tools Directory',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLI Tools - Discover the Best Command-Line Tools",
    description: "A curated collection of modern CLI tools for developers. Find, compare, and discover the best command-line tools for your development workflow.",
    images: ['https://clitools.dev/twitter-image.jpg'],
    creator: "@clitools",
    site: "@clitools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  alternates: {
    canonical: 'https://clitools.dev',
  },
  category: "technology",
  classification: "developer tools",
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1d2021" },
    { media: "(prefers-color-scheme: dark)", color: "#1d2021" },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed Auth0Provider direct logic from here

  return (
    <html lang="en">
      <head>
        {/* Tailwind CSS is imported via globals.css, no need for CDN link */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Inter-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://clitools.dev" />
        <link rel="dns-prefetch" href="https://clitools.dev" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <AuthProvider> {/* Use the new AuthProvider component here */}
          {/* Base background and text colors are set in globals.css body {} */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 