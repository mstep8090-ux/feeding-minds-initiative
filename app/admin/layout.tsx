import Link from 'next/link'
import { LayoutDashboard, Users, Settings, LogOut, MessageSquare } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                </div>
                <nav className="mt-6">
                    <Link
                        href="/admin/team"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                        <Users className="w-5 h-5 mr-3" />
                        <span className="font-medium">Team Members</span>
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                        <MessageSquare className="w-5 h-5 mr-3" />
                        <span className="font-medium">Messages</span>
                    </Link>
                    {/* Add more links here as needed */}
                    <Link
                        href="/"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors mt-auto"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium">Exit to Site</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    )
}
