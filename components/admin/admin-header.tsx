'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
    onMenuClick: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 md:hidden">
            <div className="px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={onMenuClick}>
                        <Menu className="h-6 w-6" />
                    </Button>
                    <span className="font-bold text-lg text-primary">Admin Panel</span>
                </div>
            </div>
        </header>
    )
}
