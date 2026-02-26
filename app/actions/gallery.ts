'use server'

import dbConnect from '@/lib/db'
import GalleryImage from '@/models/GalleryImage'
import { revalidatePath } from 'next/cache'

export interface IGalleryImage {
    _id: string;
    image: string;
    title?: string;
    order: number;
}

export async function getGalleryImages() {
    await dbConnect()
    try {
        const images = await GalleryImage.find({}).sort({ order: 1 }).lean()
        return images.map(img => ({
            ...img,
            _id: img._id.toString()
        }))
    } catch (error) {
        console.error('Failed to fetch gallery images:', error)
        return []
    }
}

export async function createGalleryImage(data: Partial<IGalleryImage>) {
    await dbConnect()
    try {
        const lastItem = await GalleryImage.findOne().sort({ order: -1 })
        const newOrder = lastItem ? lastItem.order + 1 : 0

        const newItem = await GalleryImage.create({ ...data, order: newOrder })
        revalidatePath('/')
        revalidatePath('/admin/gallery')
        return { success: true, image: JSON.parse(JSON.stringify(newItem)) }
    } catch (error) {
        console.error('Failed to create gallery image:', error)
        return { success: false, error: 'Failed to create gallery image' }
    }
}

export async function deleteGalleryImage(id: string) {
    await dbConnect()
    try {
        await GalleryImage.findByIdAndDelete(id)
        revalidatePath('/')
        revalidatePath('/admin/gallery')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete gallery image:', error)
        return { success: false, error: 'Failed to delete gallery image' }
    }
}

export async function reorderGalleryImages(items: { id: string, order: number }[]) {
    await dbConnect()
    try {
        const updatePromises = items.map(item =>
            GalleryImage.findByIdAndUpdate(item.id, { order: item.order })
        )
        await Promise.all(updatePromises)
        revalidatePath('/')
        revalidatePath('/admin/gallery')
        return { success: true }
    } catch (error) {
        console.error('Failed to reorder gallery images:', error)
        return { success: false, error: 'Failed to reorder gallery images' }
    }
}
