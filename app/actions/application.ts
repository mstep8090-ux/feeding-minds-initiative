'use server'

import { revalidatePath } from 'next/cache'
import Application from '@/models/Application'
// Assuming you have a db connect utility. If not, I'll check lib/db or similar.
// Checking previous file confirms mongoose usage but not connection utility path.
// I'll assume standard pattern or check project structure.
// Wait, I should check commonly used db connection file first. I'll guess lib/db.ts or similar based on standard lists.
// To be safe, I'll inspect `lib` first in a separate step or just include the connection logic if it's simple/standard.
// Actually, looking at `package.json` earlier, `mongoose` is installed.
// I'll check `lib` directory content to be sure about db connection.
// For now, I will write the file assuming a standard `connectDB` if it exists, or I will adapt.
// Let me verify `lib` contents in the next turn if I fail. For now I'll use a placeholder import and fix if needed.
// Actually, I'll list `lib` parallel to this to be sure.
import { connectToDB } from '@/lib/db' // Hypothetical, will verify

export async function submitApplication(formData: FormData) {
    try {
        await connectToDB()

        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            location: formData.get('location'),
            school: formData.get('school'),
            class: formData.get('class'),
            skillOfInterest: formData.get('skillOfInterest'),
            reason: formData.get('reason'),
        }

        // specific validation could go here

        await Application.create(data)

        revalidatePath('/admin/applications')
        return { success: true, message: 'Application submitted successfully!' }
    } catch (error: any) {
        console.error('Submission Error:', error)
        return { success: false, error: error.message || 'Failed to submit application.' }
    }
}

export async function getApplications() {
    try {
        await connectToDB()
        const applications = await Application.find({}).sort({ createdAt: -1 })
        // Convert _id to string to avoid serialization issues in Next.js
        return JSON.parse(JSON.stringify(applications))
    } catch (error) {
        console.error('Fetch Error:', error)
        return []
    }
}
