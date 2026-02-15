import mongoose from 'mongoose';

export interface IContact extends mongoose.Document {
    fullName: string;
    email: string;
    phone?: string;
    interestType: string;
    message: string;
    read: boolean;
    createdAt: Date;
}

const ContactSchema = new mongoose.Schema<IContact>({
    fullName: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: String,
    },
    interestType: {
        type: String,
        required: [true, 'Please provide an interest type'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    read: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
