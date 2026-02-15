'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        // Set a cookie to indicate the user is logged in
        // In a real app, this should be a secure, signed JWT or session ID
        // valid for 24 hours
        const oneDay = 24 * 60 * 60 * 1000
        const cookieStore = await cookies()

        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: Date.now() + oneDay,
            sameSite: 'strict',
            path: '/'
        })

        redirect('/admin/team')
    } else {
        return { error: 'Invalid username or password' }
    }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    redirect('/admin/login')
}
