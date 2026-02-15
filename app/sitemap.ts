import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://feedingmindsinitiative.org'

    // Add more dynamic routes here if you have a CMS or database
    const routes = [
        '',
        '/about',
        '/programs',
        '/team',
        '/contact',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
