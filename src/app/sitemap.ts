import { MetadataRoute } from 'next'

const baseUrl = 'https://lankaumeshtours.com'

const tours = [
  { id: 1, slug: 'heritage-natural-wildlife' },
  { id: 2, slug: 'heritage-hill-country' },
  { id: 3, slug: 'wildlife-safari-yala' },
  { id: 4, slug: 'wildlife-safari-udawalawe' },
  { id: 5, slug: 'galle-city-tour' },
  { id: 6, slug: 'madu-river-boat-safari' },
  { id: 7, slug: 'mirissa-whale-watching' },
  { id: 8, slug: 'airport-transfer-sri-lanka' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
  ]

  const tourPages: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...tourPages]
}