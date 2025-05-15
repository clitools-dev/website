"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  // For static export compatibility and client-side rendering, use window.location.origin
  // Fallback to env var only if window is not defined (e.g. during build, though unlikely for a client component's core logic)
  const redirectUri = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    console.error(
      "Auth0 environment variables (NEXT_PUBLIC_AUTH0_DOMAIN, NEXT_PUBLIC_AUTH0_CLIENT_ID, NEXT_PUBLIC_AUTH0_CALLBACK_URL) are not set. Please check your .env.local file."
    );
    // Render children without Auth0Provider if config is missing, or a specific error UI
    return <>{children}</>; // Or return an error message component
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        // audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE, // Uncomment if you need to access a protected API
      }}
      // cacheLocation="localstorage" // Optional: configure token storage
    >
      {children}
    </Auth0Provider>
  );
} 