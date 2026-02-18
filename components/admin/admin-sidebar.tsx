'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Settings, LogOut, MessageSquare, Menu, X, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface AdminSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname()

    const navItems = [
        {
            href: '/admin',
            label: 'Dashboard',
            icon: LayoutDashboard
        },
        {
            href: '/admin/team',
            label: 'Team Members',
            icon: Users
        },
        {
            href: '/admin/messages',
            label: 'Messages',
            icon: MessageSquare
        },
        {
            href: '/admin/applications',
            label: 'Applications',
            icon: FileText
        },
    ]

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:shadow-none border-r border-gray-200",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b">
                        <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                    pathname === item.href
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                                )}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t">
                        <Link
                            href="/"
                            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Exit to Site
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    )
}
