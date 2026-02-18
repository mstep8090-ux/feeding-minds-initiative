import { ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TeamMember {
    _id: string
    name: string
    role: string
    bio: string
    branch: string
    focus: string
    image: string
    order: number
}

interface TeamMemberCardProps {
    member: TeamMember
    index: number
    totalMembers: number
    onEdit: (member: TeamMember) => void
    onDelete: (id: string) => void
    onMove: (index: number, direction: 'up' | 'down') => void
}

export default function TeamMemberCard({
    member,
    index,
    totalMembers,
    onEdit,
    onDelete,
    onMove
}: TeamMemberCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border">
                        <Image
                            src={member.image || '/placeholder.svg'}
                            alt={member.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg truncate pr-2">{member.name}</h3>
                            <div className="flex flex-col gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    disabled={index === 0}
                                    onClick={() => onMove(index, 'up')}
                                >
                                    <ArrowUp className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    disabled={index === totalMembers - 1}
                                    onClick={() => onMove(index, 'down')}
                                >
                                    <ArrowDown className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">{member.branch}</Badge>
                            <Badge variant="secondary" className="text-xs">{member.focus}</Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-2 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(member)} className="w-full">
                    <Pencil className="h-3 w-3 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(member._id)} className="w-full">
                    <Trash2 className="h-3 w-3 mr-2" /> Delete
                </Button>
            </CardFooter>
        </Card>
    )
}
