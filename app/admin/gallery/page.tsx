'use client'

import { useState, useEffect } from 'react'
import { createGalleryImage, deleteGalleryImage, reorderGalleryImages, getGalleryImages, IGalleryImage } from '@/app/actions/gallery'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, ArrowLeft, ArrowRight, LogOut } from 'lucide-react'
import Image from 'next/image'

export default function AdminGalleryPage() {
    const [images, setImages] = useState<IGalleryImage[]>([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [previewBase64, setPreviewBase64] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchImages()
    }, [])

    const fetchImages = async () => {
        setLoading(true)
        try {
            const data = await getGalleryImages()
            // @ts-ignore
            setImages(data)
        } catch (error) {
            toast.error('Failed to fetch gallery')
        } finally {
            setLoading(false)
        }
    }

    const handleOpen = () => {
        setPreviewBase64('')
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
                const maxWidth = 1000
                const scale = maxWidth / img.width
                const width = maxWidth
                const height = img.height * scale

                canvas.width = width
                canvas.height = height

                const ctx = canvas.getContext('2d')
                ctx?.drawImage(img, 0, 0, width, height)

                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8)
                setPreviewBase64(compressedBase64)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!previewBase64) {
            toast.error('Please select an image')
            return
        }
        setIsSubmitting(true)

        try {
            const result = await createGalleryImage({ image: previewBase64 })
            if (result.success) {
                toast.success('Image uploaded successfully')
                fetchImages()
                setIsOpen(false)
            } else {
                toast.error(result.error || 'Failed to upload image')
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return

        try {
            const result = await deleteGalleryImage(id)
            if (result.success) {
                toast.success('Deleted successfully')
                fetchImages()
            } else {
                toast.error(result.error || 'Failed to delete')
            }
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const moveItem = async (index: number, direction: 'left' | 'right') => {
        const newItems = [...images]
        if (direction === 'left' && index > 0) {
            [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]]
        } else if (direction === 'right' && index < newItems.length - 1) {
            [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
        } else {
            return
        }

        setImages(newItems)

        const updates = newItems.map((item, idx) => ({
            id: item._id,
            order: idx
        }))

        try {
            await reorderGalleryImages(updates)
        } catch (error) {
            toast.error('Failed to save order')
            fetchImages()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Training Gallery</h2>
                <div className="flex items-center gap-2">
                    <form action={logout}>
                        <Button variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </form>
                    <Button onClick={() => handleOpen()}>
                        <Plus className="mr-2 h-4 w-4" /> <span className="hidden sm:inline">Add Image</span><span className="sm:hidden">Add</span>
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center p-8 bg-white rounded-lg shadow">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow">
                        No images found. Upload one to display in the gallery.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {images.map((item, index) => (
                            <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden group relative">
                                <div className="h-48 relative bg-gray-100">
                                    <Image
                                        src={item.image}
                                        alt={`Gallery ${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                        <div className="flex justify-between">
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-8 w-8 bg-white/20 hover:bg-white text-white hover:text-black"
                                                onClick={() => moveItem(index, 'left')}
                                                disabled={index === 0}
                                            >
                                                <ArrowLeft size={16} />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                className="h-8 w-8 bg-white/20 hover:bg-white text-white hover:text-black"
                                                onClick={() => moveItem(index, 'right')}
                                                disabled={index === images.length - 1}
                                            >
                                                <ArrowRight size={16} />
                                            </Button>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="h-8 w-8 shadow-lg"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload Gallery Image</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex flex-col items-center gap-4">
                                {previewBase64 ? (
                                    <div className="relative h-48 w-full overflow-hidden rounded bg-gray-100 border shrink-0">
                                        <Image src={previewBase64} alt="Preview" fill className="object-contain" />
                                    </div>
                                ) : (
                                    <div className="h-48 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 text-gray-500">
                                        No Image Selected
                                    </div>
                                )}
                                <div className="w-full">
                                    <Input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="cursor-pointer"
                                        required
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Max file size: 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !previewBase64}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Upload
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
