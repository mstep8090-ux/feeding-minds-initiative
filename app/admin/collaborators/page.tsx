'use client'

import { useState, useEffect, useRef } from 'react'
import { createCollaborator, updateCollaborator, deleteCollaborator, reorderCollaborators, getCollaborators, ICollaborator } from '@/app/actions/collaborators'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Plus, Pencil, Trash2, ArrowUp, ArrowDown, LogOut, Upload } from 'lucide-react'
import Image from 'next/image'

export default function AdminCollaboratorsPage() {
    const [members, setMembers] = useState<ICollaborator[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [editingMember, setEditingMember] = useState<ICollaborator | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        image: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        setLoading(true)
        try {
            const data = await getCollaborators()
            // @ts-ignore
            setMembers(data)
        } catch (error) {
            toast.error('Failed to fetch collaborators')
        } finally {
            setLoading(false)
        }
    }

    const handleOpen = (member?: ICollaborator) => {
        if (member) {
            setEditingMember(member)
            setFormData({
                name: member.name,
                role: member.role,
                bio: member.bio,
                image: member.image || '',
            })
        } else {
            setEditingMember(null)
            setFormData({
                name: '',
                role: '',
                bio: '',
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
                const result = await updateCollaborator(editingMember._id, formData)
                if (result.success) {
                    toast.success('Collaborator updated successfully')
                    fetchMembers()
                    setIsOpen(false)
                } else {
                    toast.error(result.error || 'Failed to update')
                }
            } else {
                const result = await createCollaborator(formData)
                if (result.success) {
                    toast.success('Collaborator created successfully')
                    fetchMembers()
                    setIsOpen(false)
                } else {
                    toast.error(result.error || 'Failed to create')
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this collaborator?')) return

        try {
            const result = await deleteCollaborator(id)
            if (result.success) {
                toast.success('Deleted successfully')
                fetchMembers()
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        } catch (error) {
            toast.error('Failed to delete')
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
            await reorderCollaborators(updates)
        } catch (error) {
            toast.error('Failed to save order')
            fetchMembers() // Revert
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Collaborators & Advisors</h2>
                <div className="flex items-center gap-2">
                    <form action={logout}>
                        <Button variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </form>
                    <Button onClick={() => handleOpen()}>
                        <Plus className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Add Collaborator</span><span className="sm:hidden">Add</span>
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
                        No collaborators found. Add one to get started.
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {members.map((member, index) => (
                                <div key={member._id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 gap-4">
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
                                        <div className="h-16 w-16 relative rounded-full overflow-hidden bg-gray-200 border flex-shrink-0">
                                            {member.image ? (
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                    No Img
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                                            <p className="text-sm font-semibold text-accent">{member.role}</p>
                                            <p className="text-sm text-gray-500 line-clamp-1">{member.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 shrink-0">
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
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingMember ? 'Edit' : 'Add'} Collaborator/Advisor</DialogTitle>
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
                            <Label htmlFor="role">Role / Title</Label>
                            <Input
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                                maxLength={60}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Profile Image</Label>
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
                                        Upload an image (max 5MB).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Brief Bio</Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                required
                                maxLength={200}
                                className="h-24"
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {formData.bio.length}/200 characters
                            </p>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingMember ? 'Update' : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
