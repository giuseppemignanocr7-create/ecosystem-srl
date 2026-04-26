import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/demo-internal/'],
    },
    sitemap: 'https://ecosystem.com/sitemap.xml',
  }
}
