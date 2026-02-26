'use server'

import dbConnect from '@/lib/db'
import Service from '@/models/Service'
import { revalidatePath } from 'next/cache'

export interface IService {
    _id: string;
    title: string;
    caption: string;
    details?: string;
    tag?: string;
    image: string;
    order: number;
}

export async function getServices() {
    await dbConnect()
    try {
        const services = await Service.find({}).sort({ order: 1 }).lean()
        return services.map(s => ({
            ...s,
            _id: s._id.toString()
        }))
    } catch (error) {
        console.error('Failed to fetch services:', error)
        return []
    }
}

export async function createService(data: Partial<IService>) {
    await dbConnect()
    try {
        const lastItem = await Service.findOne().sort({ order: -1 })
        const newOrder = lastItem ? lastItem.order + 1 : 0

        const newItem = await Service.create({ ...data, order: newOrder })
        revalidatePath('/')
        revalidatePath('/admin/services')
        return { success: true, service: JSON.parse(JSON.stringify(newItem)) }
    } catch (error) {
        console.error('Failed to create service:', error)
        return { success: false, error: 'Failed to create service' }
    }
}

export async function updateService(id: string, data: Partial<IService>) {
    await dbConnect()
    try {
        const updatedItem = await Service.findByIdAndUpdate(id, data, { new: true }).lean()
        revalidatePath('/')
        revalidatePath('/admin/services')
        if (!updatedItem) return { success: false, error: 'Service not found' }
        return { success: true, service: { ...updatedItem, _id: updatedItem._id.toString() } }
    } catch (error) {
        console.error('Failed to update service:', error)
        return { success: false, error: 'Failed to update service' }
    }
}

export async function deleteService(id: string) {
    await dbConnect()
    try {
        await Service.findByIdAndDelete(id)
        revalidatePath('/')
        revalidatePath('/admin/services')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete service:', error)
        return { success: false, error: 'Failed to delete service' }
    }
}

export async function reorderServices(items: { id: string, order: number }[]) {
    await dbConnect()
    try {
        const updatePromises = items.map(item =>
            Service.findByIdAndUpdate(item.id, { order: item.order })
        )
        await Promise.all(updatePromises)
        revalidatePath('/')
        revalidatePath('/admin/services')
        return { success: true }
    } catch (error) {
        console.error('Failed to reorder services:', error)
        return { success: false, error: 'Failed to reorder services' }
    }
}
