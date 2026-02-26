import mongoose from 'mongoose'

const ServiceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a service title'],
        },
        caption: {
            type: String,
            required: [true, 'Please provide a service caption'],
        },
        details: {
            type: String,
            required: false,
        },
        tag: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: [true, 'Please provide an image for the service'],
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema)
