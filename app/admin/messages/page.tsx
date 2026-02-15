'use client'

import { useState, useEffect } from 'react'
import { getContactMessages, markMessageAsRead, deleteContactMessage } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Loader2, Trash2, Mail, MailOpen, Calendar, User, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

interface ContactMessage {
    _id: string
    fullName: string
    email: string
    phone?: string
    interestType: string;
    message: string
    read: boolean
    createdAt: string
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        setLoading(true)
        try {
            // @ts-ignore
            const data = await getContactMessages()
            // @ts-ignore
            setMessages(data)
        } catch (error) {
            toast.error('Failed to fetch messages')
        } finally {
            setLoading(false)
        }
    }

    const handleViewMessage = async (message: ContactMessage) => {
        setSelectedMessage(message)
        if (!message.read) {
            try {
                await markMessageAsRead(message._id)
                // Update local state
                setMessages(prev => prev.map(m => m._id === message._id ? { ...m, read: true } : m))
            } catch (error) {
                console.error('Failed to mark as read')
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return

        try {
            const result = await deleteContactMessage(id)
            if (result.success) {
                toast.success('Message deleted')
                setMessages(prev => prev.filter(m => m._id !== id))
                if (selectedMessage?._id === id) setSelectedMessage(null)
            } else {
                toast.error('Failed to delete message')
            }
        } catch (error) {
            toast.error('Failed to delete message')
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Messages</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No messages found.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                className={`p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50/50' : ''}`}
                                onClick={() => handleViewMessage(message)}
                            >
                                <div className="flex items-center space-x-4 overflow-hidden">
                                    <div className={`p-2 rounded-full ${message.read ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-600'}`}>
                                        {message.read ? <MailOpen size={20} /> : <Mail size={20} />}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className={`text-sm font-medium ${!message.read ? 'text-gray-900 font-bold' : 'text-gray-900'}`}>
                                                {message.fullName}
                                            </h3>
                                            {!message.read && (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                                    New
                                                </span>
                                            )}
                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                                {message.interestType}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{message.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">{format(new Date(message.createdAt), 'PPp')}</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(message._id)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Message Details</DialogTitle>
                        <DialogDescription>
                            Sent on {selectedMessage && format(new Date(selectedMessage.createdAt), 'PPp')}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedMessage && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <User className="mr-2 h-4 w-4" /> Name
                                    </div>
                                    <div className="font-medium">{selectedMessage.fullName}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Mail className="mr-2 h-4 w-4" /> Email
                                    </div>
                                    <div className="font-medium">{selectedMessage.email}</div>
                                </div>
                                {selectedMessage.phone && (
                                    <div className="space-y-1">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Phone className="mr-2 h-4 w-4" /> Phone
                                        </div>
                                        <div className="font-medium">{selectedMessage.phone}</div>
                                    </div>
                                )}
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <CheckCircle className="mr-2 h-4 w-4" /> Interest
                                    </div>
                                    <div className="font-medium capitalize">{selectedMessage.interestType}</div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                                {selectedMessage.message}
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (selectedMessage) {
                                    handleDelete(selectedMessage._id)
                                    setSelectedMessage(null)
                                }
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

import { Phone } from 'lucide-react'
