import mongoose from 'mongoose'

const GalleryImageSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, 'Please provide an image'],
        },
        title: {
            type: String,
            required: false,
            default: 'Gallery Image'
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

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema)
