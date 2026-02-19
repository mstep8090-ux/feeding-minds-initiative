'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface ExportButtonProps {
    data: any[]
}

export default function ExportButton({ data }: ExportButtonProps) {
    const exportCSV = () => {
        if (!data || data.length === 0) return

        // Define headers
        const headers = ['Date', 'Name', 'Email', 'Phone', 'Skill', 'Location', 'Status']

        // Map data to CSV rows
        const rows = data.map(app => [
            new Date(app.createdAt).toLocaleDateString(),
            `"${app.fullName}"`, // Quote strings to handle commas
            app.email,
            app.phone,
            `"${app.skillOfInterest}"`,
            `"${app.location}"`,
            app.status
        ])

        // Combine headers and rows
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n')

        // Create blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Button onClick={exportCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
        </Button>
    )
}
