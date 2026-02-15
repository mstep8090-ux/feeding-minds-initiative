import mongoose from 'mongoose';

export interface ITeamMember extends mongoose.Document {
    name: string;
    role: string;
    bio: string;
    branch: string;
    focus: string;
    image: string;
    order: number;
}

const TeamMemberSchema = new mongoose.Schema<ITeamMember>({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    role: {
        type: String,
        required: [true, 'Please provide a role'],
        maxlength: [60, 'Role cannot be more than 60 characters'],
    },
    bio: {
        type: String,
        required: [true, 'Please provide a bio'],
        maxlength: [150, 'Bio cannot be more than 150 characters'],
    },
    branch: {
        type: String,
        required: [true, 'Please specify a branch'],
        enum: ['National', 'Lagos', 'Abuja', 'Isior'],
    },
    focus: {
        type: String,
        required: [true, 'Please provide a focus area'],
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL'],
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
