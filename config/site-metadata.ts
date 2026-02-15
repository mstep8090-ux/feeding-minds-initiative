import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://feedingmindsinitiative.org'),
    title: {
        default: 'Feeding Minds Initiative | Empowering Nigerian Youth',
        template: '%s | Feeding Minds Initiative',
    },
    description: 'Empowering Nigerian youth with free practical skills, vocational training, and mentorship. Join FMI in Benin City to build a better future through graphic design, crafts, and technology.',
    keywords: [
        'Feeding Minds Initiative',
        'FMI',
        'Nigeria Youth Empowered',
        'Skill Acquisition Nigeria',
        'Youth Empowerment Benin City',
        'Free Vocational Training',
        'NGO Nigeria',
        'Community Development',
        'Tech Skills for Youth',
        'Feeding Minds'
    ],
    authors: [{ name: 'Feeding Minds Initiative' }],
    creator: 'Feeding Minds Initiative',
    publisher: 'Feeding Minds Initiative',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_NG',
        url: 'https://feedingmindsinitiative.org',
        title: 'Feeding Minds Initiative | Empowering Nigerian Youth',
        description: 'Empowering Nigerian youth with free practical skills, vocational training, and mentorship. Join us in building a self-reliant generation.',
        siteName: 'Feeding Minds Initiative',
        images: [
            {
                url: '/hero-main.jpg',
                width: 1200,
                height: 630,
                alt: 'Feeding Minds Initiative Team',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Feeding Minds Initiative | Empowering Nigerian Youth',
        description: 'Empowering Nigerian youth with free practical skills, vocational training, and mentorship.',
        images: ['/hero-main.jpg'],
        creator: '@feedingminds',
    },
    verification: {
        google: 'google-site-verification-code',
        other: {
            'yandex-verification': 'yandex-verification-code',
            'bing-verification': 'bing-verification-code',
        },
    },
    alternates: {
        canonical: 'https://feedingmindsinitiative.org',
    },
    category: 'Non-Profit Organization',
    classification: 'Youth Empowerment',
    other: {
        'geo.region': 'NG-ED',
        'geo.placename': 'Benin City',
        'geo.position': '6.335;5.6037',
        'ICBM': '6.335, 5.6037',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#0f172a',
}
