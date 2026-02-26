'use client'

import { useState, useEffect } from 'react'
import { createTestimony, updateTestimony, deleteTestimony, reorderTestimonies, getTestimonies, ITestimony } from '@/app/actions/testimonies'
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

export default function AdminTestimoniesPage() {
    const [items, setItems] = useState<ITestimony[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<ITestimony | null>(null)
    const [formData, setFormData] = useState<{
        name: string;
        role: string;
        content: string;
        image: string;
        type: 'Testimony' | 'Update' | 'Review';
    }>({
        name: '',
        role: '',
        content: '',
        image: '',
        type: 'Testimony',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setLoading(true)
        try {
            const data = await getTestimonies()
            // @ts-ignore
            setItems(data)
        } catch (error) {
            toast.error('Failed to fetch items')
        } finally {
            setLoading(false)
        }
    }

    const handleOpen = (item?: ITestimony) => {
        if (item) {
            setEditingItem(item)
            setFormData({
                name: item.name,
                role: item.role,
                content: item.content,
                image: item.image || '',
                type: item.type,
            })
        } else {
            setEditingItem(null)
            setFormData({
                name: '',
                role: '',
                content: '',
                image: '',
                type: 'Testimony',
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
                const maxWidth = 600
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
            if (editingItem) {
                const result = await updateTestimony(editingItem._id, formData)
                if (result.success) {
                    toast.success('Updated successfully')
                    fetchItems()
                    setIsOpen(false)
                } else {
                    toast.error(result.error || 'Failed to update')
                }
            } else {
                const result = await createTestimony(formData)
                if (result.success) {
                    toast.success('Created successfully')
                    fetchItems()
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
        if (!confirm('Are you sure you want to delete this item?')) return

        try {
            const result = await deleteTestimony(id)
            if (result.success) {
                toast.success('Deleted successfully')
                fetchItems()
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        const newItems = [...items]
        if (direction === 'up' && index > 0) {
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]]
        } else if (direction === 'down' && index < newItems.length - 1) {
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
        } else {
            return
        }

        // Optimistic update
        setItems(newItems)

        // Update order on server
        const updates = newItems.map((item, idx) => ({
            id: item._id,
            order: idx
        }))

        try {
            await reorderTestimonies(updates)
        } catch (error) {
            toast.error('Failed to save order')
            fetchItems() // Revert
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Testimonies & Updates</h2>
                <div className="flex items-center gap-2">
                    <form action={logout}>
                        <Button variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </form>
                    <Button onClick={() => handleOpen()}>
                        <Plus className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Add New</span><span className="sm:hidden">Add</span>
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center p-8 bg-white rounded-lg shadow">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
                        No entries found. Add a testimony or update to get started.
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {items.map((item, index) => (
                                <div key={item._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 gap-4">
                                    <div className="flex items-start md:items-center space-x-4">
                                        <div className="flex flex-col space-y-1 mr-2 mt-2 md:mt-0">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                disabled={index === 0}
                                                onClick={() => moveItem(index, 'up')}
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                disabled={index === items.length - 1}
                                                onClick={() => moveItem(index, 'down')}
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {item.image && (
                                            <div className="hidden sm:block h-16 w-16 relative rounded overflow-hidden bg-gray-200 border flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-primary/10 text-primary rounded-full font-bold">
                                                    {item.type}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-accent">{item.role}</p>
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.content}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 shrink-0 md:self-center">
                                        <Button variant="outline" size="sm" onClick={() => handleOpen(item)}>
                                            <Pencil className="h-4 w-4 mr-1" /> Edit
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item._id)}>
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
                        <DialogTitle>{editingItem ? 'Edit' : 'Add'} Entry</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(value: 'Testimony' | 'Update' | 'Review') => setFormData({ ...formData, type: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Testimony">Testimony (General)</SelectItem>
                                    <SelectItem value="Update">Update (News/Activity)</SelectItem>
                                    <SelectItem value="Review">Review (Client Feedback)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name / Title</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                maxLength={60}
                                placeholder={formData.type === 'Update' ? 'e.g. Recent Workshop at School X' : 'e.g. John Doe'}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role / Subtitle</Label>
                            <Input
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                required
                                maxLength={60}
                                placeholder={formData.type === 'Update' ? 'e.g. Skill Acquisition Program' : 'e.g. Trainee'}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Image (Optional)</Label>
                            <div className="flex items-center gap-4">
                                {formData.image && (
                                    <div className="relative h-16 w-16 overflow-hidden rounded bg-gray-100 border">
                                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="cursor-pointer"
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Upload an image (max 5MB). Good for updates or member portraits.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                                maxLength={500}
                                className="h-32"
                            />
                            <p className="text-xs text-muted-foreground text-right">
                                {formData.content.length}/500 characters
                            </p>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingItem ? 'Update' : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
