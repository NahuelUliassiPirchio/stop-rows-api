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
    row: {
        type: Schema.Types.ObjectId,
        ref: 'Row',
        default: null,
    },
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

UserSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.__v;
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    }
});

const User = model('User', UserSchema);

module.exports = User;