'use server'

import dbConnect from '@/lib/db'
import Testimony from '@/models/Testimony'
import { revalidatePath } from 'next/cache'

// Define the type locally matching the model
export interface ITestimony {
    _id: string;
    name: string;
    role: string;
    content: string;
    image?: string;
    type: 'Testimony' | 'Update' | 'Review';
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export async function getTestimonies() {
    await dbConnect()
    try {
        const items = await Testimony.find({}).sort({ order: 1 }).lean()
        return items.map(item => ({
            ...item,
            _id: item._id.toString(),
            // @ts-ignore
            createdAt: item.createdAt?.toISOString(),
            // @ts-ignore
            updatedAt: item.updatedAt?.toISOString()
        }))
    } catch (error) {
        console.error('Failed to fetch testimonies:', error)
        return []
    }
}

export async function createTestimony(data: Partial<ITestimony>) {
    await dbConnect()
    try {
        const lastItem = await Testimony.findOne().sort({ order: -1 })
        const newOrder = lastItem ? lastItem.order + 1 : 0

        const newItem = await Testimony.create({ ...data, order: newOrder })
        revalidatePath('/testimonies')
        revalidatePath('/admin/testimonies')
        revalidatePath('/') // Because reviews will show on homepage
        return { success: true, testimony: JSON.parse(JSON.stringify(newItem)) }
    } catch (error) {
        console.error('Failed to create testimony:', error)
        return { success: false, error: 'Failed to create testimony' }
    }
}

export async function updateTestimony(id: string, data: Partial<ITestimony>) {
    await dbConnect()
    try {
        const updatedItem = await Testimony.findByIdAndUpdate(id, data, { new: true }).lean()
        revalidatePath('/testimonies')
        revalidatePath('/admin/testimonies')
        revalidatePath('/')
        if (!updatedItem) return { success: false, error: 'Testimony not found' }
        return { success: true, testimony: { ...updatedItem, _id: updatedItem._id.toString() } }
    } catch (error) {
        console.error('Failed to update testimony:', error)
        return { success: false, error: 'Failed to update testimony' }
    }
}

export async function deleteTestimony(id: string) {
    await dbConnect()
    try {
        await Testimony.findByIdAndDelete(id)
        revalidatePath('/testimonies')
        revalidatePath('/admin/testimonies')
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete testimony:', error)
        return { success: false, error: 'Failed to delete testimony' }
    }
}

export async function reorderTestimonies(items: { id: string, order: number }[]) {
    await dbConnect()
    try {
        const updatePromises = items.map(item =>
            Testimony.findByIdAndUpdate(item.id, { order: item.order })
        )
        await Promise.all(updatePromises)
        revalidatePath('/testimonies')
        revalidatePath('/admin/testimonies')
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Failed to reorder testimonies:', error)
        return { success: false, error: 'Failed to reorder testimonies' }
    }
}
