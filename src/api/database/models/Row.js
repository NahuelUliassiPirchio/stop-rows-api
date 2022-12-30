const {Schema, model} = require('mongoose');

const rowSchema = new Schema({
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

rowSchema.index({shop: 1}, {unique: true});
rowSchema.index({status: 1});

rowSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = model('Row', rowSchema);
