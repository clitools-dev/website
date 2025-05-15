import type { Metadata } from "next";
import "./globals.css"; // Corrected path for globals.css

export const metadata: Metadata = {
  title: "CLI Tools Dev",
  description: "A curated collection of modern CLI tools for developers.", // Added a default description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind CSS is imported via globals.css, no need for CDN link */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-mono antialiased">
        {/* Base background and text colors are set in globals.css body {} */}
        {children}
      </body>
    </html>
  );
} 