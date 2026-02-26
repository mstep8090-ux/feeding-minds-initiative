'use server'

import dbConnect from '@/lib/db'
import Collaborator from '@/models/Collaborator'
import { revalidatePath } from 'next/cache'

// Define the type locally matching the model
export interface ICollaborator {
    _id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export async function getCollaborators() {
    await dbConnect()
    try {
        const collaborators = await Collaborator.find({}).sort({ order: 1 }).lean()
        // Convert _id to string to be passed to client
        return collaborators.map(member => ({
            ...member,
            _id: member._id.toString(),
            // @ts-ignore
            createdAt: member.createdAt?.toISOString(),
            // @ts-ignore
            updatedAt: member.updatedAt?.toISOString()
        }))
    } catch (error) {
        console.error('Failed to fetch collaborators:', error)
        return []
    }
}

export async function createCollaborator(data: Partial<ICollaborator>) {
    await dbConnect()
    try {
        // Get the highest order to append to the end
        const lastMember = await Collaborator.findOne().sort({ order: -1 })
        const newOrder = lastMember ? lastMember.order + 1 : 0

        const newMember = await Collaborator.create({ ...data, order: newOrder })
        revalidatePath('/collaborators')
        revalidatePath('/admin/collaborators')
        return { success: true, member: JSON.parse(JSON.stringify(newMember)) }
    } catch (error) {
        console.error('Failed to create collaborator:', error)
        return { success: false, error: 'Failed to create collaborator' }
    }
}

export async function updateCollaborator(id: string, data: Partial<ICollaborator>) {
    await dbConnect()
    try {
        const updatedMember = await Collaborator.findByIdAndUpdate(id, data, { new: true }).lean()
        revalidatePath('/collaborators')
        revalidatePath('/admin/collaborators')
        if (!updatedMember) return { success: false, error: 'Collaborator not found' }
        return { success: true, member: { ...updatedMember, _id: updatedMember._id.toString() } }
    } catch (error) {
        console.error('Failed to update collaborator:', error)
        return { success: false, error: 'Failed to update collaborator' }
    }
}

export async function deleteCollaborator(id: string) {
    await dbConnect()
    try {
        await Collaborator.findByIdAndDelete(id)
        revalidatePath('/collaborators')
        revalidatePath('/admin/collaborators')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete collaborator:', error)
        return { success: false, error: 'Failed to delete collaborator' }
    }
}

export async function reorderCollaborators(items: { id: string, order: number }[]) {
    await dbConnect()
    try {
        const updatePromises = items.map(item =>
            Collaborator.findByIdAndUpdate(item.id, { order: item.order })
        )
        await Promise.all(updatePromises)
        revalidatePath('/collaborators')
        revalidatePath('/admin/collaborators')
        return { success: true }
    } catch (error) {
        console.error('Failed to reorder collaborators:', error)
        return { success: false, error: 'Failed to reorder collaborators' }
    }
}
