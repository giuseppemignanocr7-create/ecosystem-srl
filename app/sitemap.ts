import { MetadataRoute } from 'next'
import { SUITES } from '@/content/suites'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ecosystem.com'
  
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    'coremind',
    'suite',
    'demo',
    'pricing',
    'azienda',
    'contatti',
    'integrazioni',
    'supporto',
    'piattaforma',
  ].map(route => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
  
  const suiteRoutes: MetadataRoute.Sitemap = SUITES.map(suite => ({
    url: `${baseUrl}/suite/${suite.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))
  
  return [...staticRoutes, ...suiteRoutes]
}
