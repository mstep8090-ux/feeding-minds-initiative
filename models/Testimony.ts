import mongoose from 'mongoose'

const TestimonySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        role: {
            type: String,
            required: [true, 'Please provide a role or title'],
            maxlength: [60, 'Role cannot be more than 60 characters'],
        },
        content: {
            type: String,
            required: [true, 'Please provide the testimony content'],
            maxlength: [500, 'Content cannot be more than 500 characters'],
        },
        image: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: true,
            enum: ['Testimony', 'Update', 'Review'],
            default: 'Testimony',
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

export default mongoose.models.Testimony || mongoose.model('Testimony', TestimonySchema)
