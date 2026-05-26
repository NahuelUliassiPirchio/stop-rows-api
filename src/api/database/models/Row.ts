import { Schema, model } from 'mongoose';
import { IRowDocument } from '../../../types/Row';

const rowSchema = new Schema<IRowDocument>({
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    customers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

rowSchema.index({ shop: 1 }, { unique: true });
rowSchema.index({ status: 1 });

rowSchema.set('toJSON', {
    transform: (_: IRowDocument, returnedObject: Record<string, unknown>) => {
        returnedObject.id = (returnedObject._id as { toString(): string }).toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export default model<IRowDocument>('Row', rowSchema);
