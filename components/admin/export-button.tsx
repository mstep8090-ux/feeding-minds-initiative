'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface ExportButtonProps {
    data: any[]
}

export default function ExportButton({ data }: ExportButtonProps) {
    const exportPDF = () => {
        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.text('Program Applications', 14, 22)
        doc.setFontSize(11)
        doc.setTextColor(100)
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30)

        const tableData = data.map(app => [
            new Date(app.createdAt).toLocaleDateString(),
            app.fullName,
            app.email,
            app.phone,
            app.skillOfInterest,
            app.location
        ])

        autoTable(doc, {
            head: [['Date', 'Name', 'Email', 'Phone', 'Skill', 'Location']],
            body: tableData,
            startY: 40,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [41, 128, 185] }
        })

        doc.save('applications.pdf')
    }

    return (
        <Button onClick={exportPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export to PDF
        </Button>
    )
}
