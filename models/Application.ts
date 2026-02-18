import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IApplication extends Document {
    fullName: string
    email: string
    phone: string
    address: string
    location: string
    school: string
    class: string
    skillOfInterest: string
    reason: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: Date
    updatedAt: Date
}

const ApplicationSchema = new Schema<IApplication>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        location: { type: String, required: true },
        school: { type: String, required: true },
        class: { type: String, required: true },
        skillOfInterest: { type: String, required: true },
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
)

const Application: Model<IApplication> =
    mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema)

export default Application
