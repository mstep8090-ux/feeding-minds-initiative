import { getApplications } from '@/app/actions/application'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import ExportButton from '@/components/admin/export-button'

export default async function ApplicationsPage() {
    const applications = await getApplications()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
                <ExportButton data={applications} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Skill</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No applications found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((app: any) => (
                                    <TableRow key={app._id}>
                                        <TableCell>
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{app.fullName}</span>
                                                <span className="text-xs text-muted-foreground">{app.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{app.skillOfInterest}</TableCell>
                                        <TableCell>{app.location}</TableCell>
                                        <TableCell>
                                            <Badge variant={app.status === 'approved' ? 'default' : 'secondary'}>
                                                {app.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {/* Placeholder for future detailed view or status update */}
                                            <Button variant="ghost" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
