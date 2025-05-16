import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/auth/',
        '/api/',
        '/private/',
        '/*.json$',
        '/*.xml$',
      ],
    },
    sitemap: 'https://clitools.dev/sitemap.xml',
    host: 'https://clitools.dev',
  }
} 