const {Schema, model} = require('mongoose');

const ShopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
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
    category: {
        type: String,
        required: true,
    },
    coords: {
        type: String,
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
    
});

ShopSchema.index({ email: 1 }, { unique: true });

ShopSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
});

const Shop = model('Shop', ShopSchema);

module.exports = Shop;