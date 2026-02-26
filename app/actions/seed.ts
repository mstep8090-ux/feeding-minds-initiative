'use server'

import dbConnect from '@/lib/db'
import Service from '@/models/Service'
import GalleryImage from '@/models/GalleryImage'
import Testimony from '@/models/Testimony'
import { revalidatePath } from 'next/cache'

const defaultServices = [
    {
        title: 'School Outreach – Skills Acquisition',
        caption: 'We partner with schools to train students in practical, future-ready skills that build creativity and confidence.',
        image: '/outreach.png',
        order: 0
    },
    {
        title: 'Corporate Social Responsibility (CSR) Support',
        caption: 'We help companies design and execute impactful CSR projects focused on youth development and education.',
        image: '/csr.png',
        order: 1
    },
    {
        title: 'Inter-School Competitions',
        caption: 'We organize competitions that promote innovation, creativity, and healthy rivalry among schools.',
        image: '/competition.png',
        order: 2
    },
    {
        title: 'Gift a Skill (Special Day Initiative)',
        caption: 'We help individuals celebrate special occasions by gifting life-changing skills instead of regular presents.',
        image: '/gift.png',
        order: 3
    },
    {
        title: 'Event Coverage & Media Services',
        caption: 'We provide professional photography and videography services for weddings, birthdays, conferences, and other events.',
        image: '/media.png',
        order: 4
    },
    {
        title: 'Physical Training Centers',
        caption: 'We operate physical training centers for hands-on skills development and mentorship.',
        details: 'Office 1: No 10, Iyiomo lane, off Agbonma junction, opp Matice, Ekewan Road, Benin City | Office 2: Benin Shagamu Express way, opp Agen junction, Oluku Isihor, Benin City',
        image: '/training.png',
        order: 5
    },
    {
        title: 'Mind Academy Conference',
        caption: 'A transformational conference designed to inspire individuals to discover their purpose and maximize their potential.',
        tag: '“Raising the Crushing Leaders”',
        image: '/conference.png',
        order: 6
    },
]

const defaultGalleryImages = [
    '/programs-academy.jpg',
    '/programs-charity.jpg',
    '/programs-community.jpg',
    '/programs-school.jpg',
    '/outreach.png',
    '/training.png',
    '/competition.png',
    '/csr.png'
]

const defaultTestimonies = [
    {
        name: 'Sarah Johnson',
        role: 'High School Student',
        content: 'The skills acquisition program completely changed how I see my future. I actually built my first app thanks to this initiative!',
        type: 'Testimony',
        order: 0
    },
    {
        name: 'Skill Up Outreach 2026',
        role: 'Community Project',
        content: 'We successfully trained over 200 youths in digital marketing and graphic design during our recent weekend outreach in Benin City.',
        type: 'Update',
        image: '/programs-community.jpg',
        order: 1
    },
    {
        name: 'TechCorp Alliance',
        role: 'CSR Partner',
        content: 'Partnering with Feeding Minds Initiative was the best decision for our CSR goals. Their execution and passion are unmatched.',
        type: 'Review',
        order: 2
    },
    {
        name: 'David Okafor',
        role: 'Beneficiary',
        content: 'I received the "Gift a Skill" package for my birthday instead of a regular present, and it helped me secure a freelance job.',
        type: 'Testimony',
        order: 3
    }
]

export async function seedDemoData() {
    await dbConnect()
    let seeded = false

    try {
        // Seed Services if none exist
        const serviceCount = await Service.countDocuments()
        if (serviceCount === 0) {
            await Service.insertMany(defaultServices)
            seeded = true
            console.log('Seeded default services')
        }

        // Seed Gallery Images if none exist
        const galleryCount = await GalleryImage.countDocuments()
        if (galleryCount === 0) {
            const galleryDocs = defaultGalleryImages.map((img, idx) => ({
                image: img,
                title: `Gallery Image ${idx + 1}`,
                order: idx
            }))
            await GalleryImage.insertMany(galleryDocs)
            seeded = true
            console.log('Seeded default gallery images')
        }

        // Seed Testimonies if none exist (useful for testing the animated scroll)
        const testimonyCount = await Testimony.countDocuments()
        if (testimonyCount === 0) {
            await Testimony.insertMany(defaultTestimonies)
            seeded = true
            console.log('Seeded default testimonies')
        }

        // We no longer call revalidatePath('/') here because seedDemoData
        // is called directly during the render of the homepage in page.tsx.

        return { success: true, seeded }
    } catch (error) {
        console.error('Failed to seed demo data:', error)
        return { success: false, error: 'Failed to seed demo data' }
    }
}
