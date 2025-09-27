import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lankaumeshtours.com'
  
  // Tour IDs from your application
  const tourIds = [1, 2, 3, 4, 5, 6, 7, 8]
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tours/1`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/2`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/3`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/4`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/5`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/6`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/7`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours/8`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ]

  // Dynamic tour pages
  const tourPages = tourIds.map((id) => ({
    url: `${baseUrl}/tours/${id}`,
    lastModified: new Date('2024-01-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Combine all pages
  return [...staticPages, ...tourPages]
}

// Optional: Export tour data for reuse in other parts of your app
export const tourData = [
  {
    id: 1,
    slug: 'heritage-natural-wildlife',
    name: 'Heritage, Natural & Wildlife',
    lastModified: '2024-01-15'
  },
  {
    id: 2,
    slug: 'heritage-hill-country',
    name: 'Heritage and Hill Country tour',
    lastModified: '2024-01-15'
  },
  {
    id: 3,
    slug: 'wildlife-safari-yala',
    name: 'Wildlife Adventure Safari',
    lastModified: '2024-01-15'
  },
  {
    id: 4,
    slug: 'wildlife-safari-udawalawa',
    name: 'Wildlife Adventure Safari Udawalawa',
    lastModified: '2024-01-15'
  },
  {
    id: 5,
    slug: 'galle-city-tour',
    name: 'Galle City Tour',
    lastModified: '2024-01-15'
  },
  {
    id: 6,
    slug: 'madu-river-safari',
    name: 'Madu River Boat Safari',
    lastModified: '2024-01-15'
  },
  {
    id: 7,
    slug: 'mirissa-whale-watching',
    name: 'Mirissa Whale Watching',
    lastModified: '2024-01-15'
  },
  {
    id: 8,
    slug: 'airport-transfer',
    name: 'Airport Drop and Pickup',
    lastModified: '2024-01-15'
  }
]

// Advanced version with dynamic data fetching (if you have a database)
export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lankaumeshtours.com'
  
  // If you have a database or CMS, fetch dynamic data here
  // const tours = await getTours()
  // const blogs = await getBlogs()
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // ... rest of static pages
  ]

  // Dynamic pages would be generated here
  // const dynamicPages = tours.map(tour => ({
  //   url: `${baseUrl}/tours/${tour.id}`,
  //   lastModified: new Date(tour.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.8,
  // }))

  return staticPages
}