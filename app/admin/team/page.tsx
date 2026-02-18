'use client'

import { useState, useEffect, useRef } from 'react'
import { createTeamMember, updateTeamMember, deleteTeamMember, reorderTeamMembers, getTeamMembers } from '@/app/actions/team'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, ArrowUp, ArrowDown, LogOut, Upload } from 'lucide-react'
import Image from 'next/image'
import TeamMemberCard from '@/components/admin/team-member-card'

// Define the type for TeamMember based on the model
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

export default function AdminTeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        branch: '',
        focus: '',
        image: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        setLoading(true)
        try {
            // @ts-ignore
            const data = await getTeamMembers()
            // @ts-ignore
            setMembers(data)
        } catch (error) {
            toast.error('Failed to fetch team members')
        } finally {
            setLoading(false)
        }
    }

    const handleOpen = (member?: TeamMember) => {
        if (member) {
            setEditingMember(member)
            setFormData({
                name: member.name,
                role: member.role,
                bio: member.bio,
                branch: member.branch,
                focus: member.focus,
                image: member.image,
            })
        } else {
            setEditingMember(null)
            setFormData({
                name: '',
                role: '',
                bio: '',
                branch: 'National',
                focus: '',
                image: '',
            })
        }
        setIsOpen(true)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB')
            return
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
            const img = new window.Image()
            img.src = event.target?.result as string
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const maxWidth = 400
                const scale = maxWidth / img.width
                const width = maxWidth
                const height = img.height * scale

                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                ctx?.drawImage(img, 0, 0, width, height)

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8)
                setFormData(prev => ({ ...prev, image: compressedBase64 }))
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (editingMember) {
                const result = await updateTeamMember(editingMember._id, formData)
                if (result.success) {
                    toast.success('Team member updated successfully')
                    fetchMembers()
                    setIsOpen(false)
                } else {
                    toast.error(result.error || 'Failed to update member')
                }
            } else {
                const result = await createTeamMember(formData)
                if (result.success) {
                    toast.success('Team member created successfully')
                    fetchMembers()
                    setIsOpen(false)
                } else {
                    toast.error(result.error || 'Failed to create member')
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return

        try {
            const result = await deleteTeamMember(id)
            if (result.success) {
                toast.success('Member deleted successfully')
                fetchMembers()
            } else {
                toast.error(result.error || 'Failed to delete member')
            }
        } catch (error) {
            toast.error('Failed to delete member')
        }
    }

    const moveMember = async (index: number, direction: 'up' | 'down') => {
        const newMembers = [...members]
        if (direction === 'up' && index > 0) {
            [newMembers[index], newMembers[index - 1]] = [newMembers[index - 1], newMembers[index]]
        } else if (direction === 'down' && index < newMembers.length - 1) {
            [newMembers[index], newMembers[index + 1]] = [newMembers[index + 1], newMembers[index]]
        } else {
            return
        }

        // Optimistic update
        setMembers(newMembers)

        // Update order on server
        const updates = newMembers.map((member, idx) => ({
            id: member._id,
            order: idx
        }))

        try {
            // @ts-ignore
            await reorderTeamMembers(updates)
        } catch (error) {
            toast.error('Failed to save order')
            fetchMembers() // Revert
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
                <div className="flex items-center gap-2">
                    <form action={logout}>
                        <Button variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </form>
                    <Button onClick={() => handleOpen()}>
                        <Plus className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Add Member</span><span className="sm:hidden">Add</span>
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center p-8 bg-white rounded-lg shadow">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : members.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
                        No team members found. Add one to get started.
                    </div>
                ) : (
                    <>
                        {/* Mobile View */}
                        <div className="grid gap-4 md:hidden">
                            {members.map((member, index) => (
                                <TeamMemberCard
                                    key={member._id}
                                    member={member}
                                    index={index}
                                    totalMembers={members.length}
                                    onEdit={handleOpen}
                                    onDelete={handleDelete}
                                    onMove={moveMember}
                                />
                            ))}
                        </div>

                        {/* Desktop View */}
                        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                            <div className="divide-y divide-gray-200">
                                {members.map((member, index) => (
                                    <div key={member._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex flex-col space-y-1 mr-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={index === 0}
                                                    onClick={() => moveMember(index, 'up')}
                                                >
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={index === members.length - 1}
                                                    onClick={() => moveMember(index, 'down')}
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="h-12 w-12 relative rounded-full overflow-hidden bg-gray-200 border">
                                                <Image
                                                    src={member.image || '/placeholder.svg'}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                                                <p className="text-sm text-gray-500">{member.role} • {member.branch}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => handleOpen(member)}>
                                                <Pencil className="h-4 w-4 mr-1" /> Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(member._id)}>
                                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                maxLength={60}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                                maxLength={60}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch</Label>
                            <Select
                                value={formData.branch}
                                onValueChange={(value) => setFormData({ ...formData, branch: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="National">National</SelectItem>
                                    <SelectItem value="Lagos">Lagos</SelectItem>
                                    <SelectItem value="Abuja">Abuja</SelectItem>
                                    <SelectItem value="Isior">Isior</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="focus">Focus Area</Label>
                            <Input
                                id="focus"
                                value={formData.focus}
                                onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                                required
                                placeholder="e.g. Leadership, Programs, Community"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Profile Data</Label>

                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-100 border">
                                    {formData.image ? (
                                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                                            <Upload className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="cursor-pointer"
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Upload an image (max 5MB). It will be resized automatically.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                required
                                maxLength={150}
                                className="h-24"
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {formData.bio.length}/150 characters
                            </p>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingMember ? 'Update Member' : 'Add Member'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
