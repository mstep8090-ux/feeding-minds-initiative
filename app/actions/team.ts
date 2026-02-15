'use server'

import dbConnect from '@/lib/db'
import TeamMember, { ITeamMember } from '@/models/TeamMember'
import { revalidatePath } from 'next/cache'

export async function getTeamMembers() {
    await dbConnect()
    try {
        const members = await TeamMember.find({}).sort({ order: 1 }).lean()
        // Convert _id to string to be passed to client
        return members.map(member => ({
            ...member,
            _id: member._id.toString(),
        }))
    } catch (error) {
        console.error('Failed to fetch team members:', error)
        return []
    }
}

export async function createTeamMember(data: Partial<ITeamMember>) {
    await dbConnect()
    try {
        // Get the highest order to append to the end
        const lastMember = await TeamMember.findOne().sort({ order: -1 })
        const newOrder = lastMember ? lastMember.order + 1 : 0

        const newMember = await TeamMember.create({ ...data, order: newOrder })
        revalidatePath('/team')
        revalidatePath('/admin/team')
        return { success: true, member: JSON.parse(JSON.stringify(newMember)) }
    } catch (error) {
        console.error('Failed to create team member:', error)
        return { success: false, error: 'Failed to create team member' }
    }
}

export async function updateTeamMember(id: string, data: Partial<ITeamMember>) {
    await dbConnect()
    try {
        const updatedMember = await TeamMember.findByIdAndUpdate(id, data, { new: true }).lean()
        revalidatePath('/team')
        revalidatePath('/admin/team')
        if (!updatedMember) return { success: false, error: 'Member not found' }
        return { success: true, member: { ...updatedMember, _id: updatedMember._id.toString() } }
    } catch (error) {
        console.error('Failed to update team member:', error)
        return { success: false, error: 'Failed to update team member' }
    }
}

export async function deleteTeamMember(id: string) {
    await dbConnect()
    try {
        await TeamMember.findByIdAndDelete(id)
        revalidatePath('/team')
        revalidatePath('/admin/team')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete team member:', error)
        return { success: false, error: 'Failed to delete team member' }
    }
}

export async function reorderTeamMembers(items: { id: string, order: number }[]) {
    await dbConnect()
    try {
        const updatePromises = items.map(item =>
            TeamMember.findByIdAndUpdate(item.id, { order: item.order })
        )
        await Promise.all(updatePromises)
        revalidatePath('/team')
        revalidatePath('/admin/team')
        return { success: true }
    } catch (error) {
        console.error('Failed to reorder team members:', error)
        return { success: false, error: 'Failed to reorder team members' }
    }
}
