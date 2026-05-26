import { Schema, model } from 'mongoose';
import { IUserDocument } from '../../../types/User';

const UserSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: 'customer',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    shops: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Shop',
        },
    ],
    row: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Row',
        }
    ],
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

UserSchema.set('toJSON', {
    transform: (_: IUserDocument, returnedObject: Record<string, unknown>) => {
        delete returnedObject.password;
        delete returnedObject.__v;
        returnedObject.id = (returnedObject._id as { toString(): string }).toString();
        delete returnedObject._id;
    }
});

UserSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export default model<IUserDocument>('User', UserSchema);
