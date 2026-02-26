import mongoose from 'mongoose'

const CollaboratorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        role: {
            type: String,
            required: [true, 'Please provide a role/title'],
            maxlength: [60, 'Role cannot be more than 60 characters'],
        },
        bio: {
            type: String,
            required: [true, 'Please provide a brief bio'],
            maxlength: [200, 'Bio cannot be more than 200 characters'],
        },
        image: {
            type: String,
            required: false,
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

export default mongoose.models.Collaborator || mongoose.model('Collaborator', CollaboratorSchema)
