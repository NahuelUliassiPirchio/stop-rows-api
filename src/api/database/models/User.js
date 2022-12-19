const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
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
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: 'customer',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.__v;
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
});

const User = model('User', UserSchema);

module.exports = User;