'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitApplication } from '@/app/actions/application'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'

const skills = [
    'Shoemaking',
    'Graphic Design (Pixellab & Canva)',
    'Business Development',
    'Leadership Training',
    'Digital Marketing',
    'Creative Writing',
    'Barbing (Hair Stylist)',
    'Body Cream Production',
    'Perfume and Body Spray',
    'Bag Making',
    'Liquid Soap, Dettol, Hair Cream, Others',
    'Leather Making (Sandals)',
    'Photo Enlargement/Framing',
    'Jotter and Book Making',
    'Tie and Dye',
    'Bleach and Izal Production',
    'Print Making (On Shirt)',
    'Photo and Video Editing (On Phone)',
    'Arts and Crafts',
    'Recycling',
    'Baking and Baking Business Skills',
    'Fashion Design',
]

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            disabled={pending}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    Apply Now
                </>
            )}
        </Button>
    )
}

export default function ApplicationForm() {
    const [key, setKey] = useState(0) // Used to reset form

    async function clientAction(formData: FormData) {
        const result = await submitApplication(formData)
        if (result.success) {
            toast.success(result.message)
            setKey((prev) => prev + 1) // Reset form
        } else {
            toast.error(result.error)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-2xl glass border border-white/20 shadow-xl">
            <div className="text-center mb-8">
                <h3 className="bricolage-grotesque-bold text-2xl text-foreground mb-2">
                    Apply for a Skill
                </h3>
                <p className="text-foreground/60 bricolage-grotesque text-sm">
                    Fill out the form below to register for one of our skill acquisition
                    programs.
                </p>
            </div>

            <form action={clientAction} key={key} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            required
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            required
                            className="bg-background/50"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+234..."
                            required
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Current Location</Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="Benin City, Edo State"
                            required
                            className="bg-background/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address">Residential Address</Label>
                    <Input
                        id="address"
                        name="address"
                        placeholder="123 Street Name, Area"
                        required
                        className="bg-background/50"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="school">School / Institution</Label>
                        <Input
                            id="school"
                            name="school"
                            placeholder="University of Benin"
                            required
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="class">Class / Level</Label>
                        <Input
                            id="class"
                            name="class"
                            placeholder="300 Level / SS3"
                            required
                            className="bg-background/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="skillOfInterest">Skill of Interest</Label>
                    <Select name="skillOfInterest" required>
                        <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select a skill to learn" />
                        </SelectTrigger>
                        <SelectContent>
                            {skills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                    {skill}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="reason">Why do you want to learn this?</Label>
                    <Textarea
                        id="reason"
                        name="reason"
                        placeholder="Tell us about your motivation..."
                        required
                        className="bg-background/50 min-h-[100px]"
                    />
                </div>

                <SubmitButton />
            </form>
        </div>
    )
}
