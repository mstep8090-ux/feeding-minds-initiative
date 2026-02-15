import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only run on admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            // If already logged in, redirect to dashboard
            if (request.cookies.has('admin_session')) {
                return NextResponse.redirect(new URL('/admin/team', request.url))
            }
            return NextResponse.next()
        }

        // Build absolute URL for login redirect
        const loginUrl = new URL('/admin/login', request.url)

        // Check for session cookie
        if (!request.cookies.has('admin_session')) {
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
