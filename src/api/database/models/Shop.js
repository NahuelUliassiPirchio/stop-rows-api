const {Schema, model} = require('mongoose');

const locationSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const ShopSchema = new Schema({
    name: {
        type: String,
        required: true,
        text: true,
    },
    description: {
        type: String,
        required: true,
        text: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
    ],
    row: {
        type: Schema.Types.ObjectId,
        ref: 'Row',
    },
});

ShopSchema.index({ email: 1 }, { unique: true });
ShopSchema.index({ website: 1 }, { unique: true });
ShopSchema.index({ name: 1, description: 1 }, { unique: true});
ShopSchema.index({ name: 'text', description: 'text' });
ShopSchema.index({ location: '2dsphere' });

ShopSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
});


module.exports = model('Shop', ShopSchema);