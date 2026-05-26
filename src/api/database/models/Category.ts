import { Schema, model } from 'mongoose';
import { ICategoryDocument } from '../../../types/Cagegory';

const CategorySchema = new Schema<ICategoryDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

CategorySchema.set('toJSON', {
    transform: (_document: ICategoryDocument, returnedObject: ICategoryDocument & { id: string, __v: number }) => {
        returnedObject.id = returnedObject._id.toString();
        delete (returnedObject as Partial<typeof returnedObject>)._id;
        delete (returnedObject as Partial<typeof returnedObject>).__v;
    }
});

export default model<ICategoryDocument>('Category', CategorySchema);
