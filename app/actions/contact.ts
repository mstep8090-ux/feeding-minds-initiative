'use server'

import dbConnect from '@/lib/db'
import Contact from '@/models/Contact'
import { revalidatePath } from 'next/cache'

export async function submitContact(formData: {
    fullName: string;
    email: string;
    phone?: string;
    interestType: string;
    message: string;
}) {
    await dbConnect()
    try {
        await Contact.create(formData)
        // We don't really need to revalidate path here as it's a new submission
        // but maybe for the admin page if it's open
        revalidatePath('/admin/messages')
        return { success: true }
    } catch (error) {
        console.error('Failed to submit contact form:', error)
        return { success: false, error: 'Failed to submit message' }
    }
}

export async function getContactMessages() {
    await dbConnect()
    try {
        const messages = await Contact.find({}).sort({ createdAt: -1 }).lean()
        return messages.map(msg => ({
            ...msg,
            _id: msg._id.toString(),
            createdAt: msg.createdAt.toISOString(),
            updatedAt: msg.updatedAt.toISOString(),
        }))
    } catch (error) {
        console.error('Failed to fetch messages:', error)
        return []
    }
}

export async function deleteContactMessage(id: string) {
    await dbConnect()
    try {
        await Contact.findByIdAndDelete(id)
        revalidatePath('/admin/messages')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete message:', error)
        return { success: false, error: 'Failed to delete message' }
    }
}

export async function markMessageAsRead(id: string) {
    await dbConnect()
    try {
        await Contact.findByIdAndUpdate(id, { read: true })
        revalidatePath('/admin/messages')
        return { success: true }
    } catch (error) {
        console.error('Failed to mark message as read:', error)
        return { success: false, error: 'Failed to update message' }
    }
}
