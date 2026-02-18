export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://feedingmindsinitiative.org/#organization',
                name: 'Feeding Minds Initiative',
                url: 'https://feedingmindsinitiative.org',
                logo: 'https://feedingmindsinitiative.org/logo.png',
                sameAs: [
                    'https://facebook.com/feedingmindsinitiative',
                    'https://twitter.com/feedingminds',
                    'https://instagram.com/feedingminds',
                    'https://linkedin.com/company/feedingmindsinitiative'
                ],
                contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '08073810811',
                    contactType: 'customer service',
                    areaServed: 'NG',
                    availableLanguage: 'en'
                }
            },
            {
                '@type': 'LocalBusiness',
                '@id': 'https://feedingmindsinitiative.org/#local-business',
                name: 'Feeding Minds Initiative',
                image: 'https://feedingmindsinitiative.org/hero-main.jpg',
                url: 'https://feedingmindsinitiative.org',
                telephone: '08073810811',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'No 10, Iyiomo lane, off Agbonma junction, opp Matice, Ekewan Road',
                    addressLocality: 'Benin City',
                    addressRegion: 'Edo',
                    postalCode: '300001',
                    addressCountry: 'NG'
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 6.335,
                    longitude: 5.6037
                },
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday'
                    ],
                    opens: '09:00',
                    closes: '17:00'
                }
            },
            {
                '@type': 'WebSite',
                '@id': 'https://feedingmindsinitiative.org/#website',
                url: 'https://feedingmindsinitiative.org',
                name: 'Feeding Minds Initiative',
                description: 'Empowering Nigerian Youth Through Skills & Mentorship',
                publisher: {
                    '@id': 'https://feedingmindsinitiative.org/#organization'
                },
                inLanguage: 'en-US'
            }
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
