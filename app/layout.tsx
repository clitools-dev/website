// Removed "use client"; - this is now a Server Component again

import type { Metadata } from "next";
import "./globals.css"; // Corrected path for globals.css
// Removed: import { Auth0Provider } from '@auth0/auth0-react';
import AuthProvider from "./auth-provider"; // Import the new AuthProvider client component

export const metadata: Metadata = {
  title: "CLI Tools Dev",
  description: "A curated collection of modern CLI tools for developers.", // Added a default description
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
      </head>
      <body className="font-mono antialiased">
        <AuthProvider> {/* Use the new AuthProvider component here */}
          {/* Base background and text colors are set in globals.css body {} */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 