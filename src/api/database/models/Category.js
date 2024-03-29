const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
});

CategorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = model('Category', CategorySchema);
