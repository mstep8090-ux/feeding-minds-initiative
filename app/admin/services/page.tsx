'use client'

import { useState, useEffect } from 'react'
import { updateService, reorderServices, getServices, IService } from '@/app/actions/services'
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
import { Loader2, Pencil, ArrowUp, ArrowDown, LogOut, Upload } from 'lucide-react'
import Image from 'next/image'

export default function AdminServicesPage() {
    const [items, setItems] = useState<IService[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<IService | null>(null)
    const [formData, setFormData] = useState<{
        title: string;
        caption: string;
        image: string;
        details?: string;
        tag?: string;
    }>({
        title: '',
        caption: '',
        image: '',
        details: '',
        tag: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        setLoading(true)
        try {
            const data = await getServices()
            // @ts-ignore
            setItems(data)
        } catch (error) {
            toast.error('Failed to fetch services')
        } finally {
            setLoading(false)
        }
    }

    const handleOpen = (item: IService) => {
        setEditingItem(item)
        setFormData({
            title: item.title,
            caption: item.caption,
            image: item.image,
            details: item.details || '',
            tag: item.tag || '',
        })
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
                const maxWidth = 800
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
        if (!editingItem) return

        setIsSubmitting(true)

        try {
            const result = await updateService(editingItem._id, formData)
            if (result.success) {
                toast.success('Updated successfully')
                fetchItems()
                setIsOpen(false)
            } else {
                toast.error(result.error || 'Failed to update')
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
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
            await reorderServices(updates)
        } catch (error) {
            toast.error('Failed to save order')
            fetchItems() // Revert
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Homepage Services</h2>
                <div className="flex items-center gap-2">
                    <form action={logout}>
                        <Button variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </form>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center p-8 bg-white rounded-lg shadow">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
                        No services found. Add one to display on the homepage.
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {items.map((item, index) => (
                                <div key={item._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 gap-4">
                                    <div className="flex items-start md:items-center space-x-4 flex-1">
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
                                        <div className="h-24 w-32 relative rounded overflow-hidden bg-gray-200 border flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                                                {item.tag && (
                                                    <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-accent text-white rounded-full font-bold">
                                                        {item.tag}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.caption}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 shrink-0 md:self-center">
                                        <Button variant="outline" size="sm" onClick={() => handleOpen(item)}>
                                            <Pencil className="h-4 w-4 mr-1" /> Edit
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Edit Service</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="caption">Caption (Short Description)</Label>
                            <Textarea
                                id="caption"
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                required
                                className="h-20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="details">Additional Details (Optional)</Label>
                            <Input
                                id="details"
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                placeholder="e.g. Office 1: Address..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tag">Tag / Badge (Optional)</Label>
                            <Input
                                id="tag"
                                value={formData.tag}
                                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                placeholder="e.g. Raising the Crushing Leaders"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">Service Image</Label>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {formData.image && (
                                    <div className="relative h-24 w-32 overflow-hidden rounded bg-gray-100 border shrink-0">
                                        <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                    </div>
                                )}
                                <div className="flex-1 w-full">
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="cursor-pointer"
                                        required={false}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Upload an image (max 5MB).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
