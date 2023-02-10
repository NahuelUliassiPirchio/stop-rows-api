const User = require('../database/models/User');
const { hashPassword } = require('../../common/Encryption');

const UsersService = {
    async getAllUsers() {
        const users = await User.find().populate('shops');
        return users;        
    },
    async getUserById(id) {
        const user = await User.findById(id);
        if(!user){
            throw new Error('User not found');
        }
        return user;
    },
    async getUserByEmail(email) {
        let user;
        try {
            user = await User.findOne({email});
        } catch (error) {
            user = null;
        }
        return user;
    },
    async addUser(user) {
        user.password = await hashPassword(user.password);
        const createdUser = await User.create(user);
        return createdUser;
    },
    async updateUser(id, user) {
        if(user.password){
            user.password = await hashPassword(user.password);
        }
        const updatedUser = await User.findByIdAndUpdate(id, user,
            {new: true});
        return updatedUser;
    },
    async deleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    },
    async getProfile(user) {
        const profile = await User.findById(user._id).populate('shops');
        return profile;
    },
    async updateProfile(user, body) {
        const profile = await User.findByIdAndUpdate(user._id, body, {new: true});
        return profile;
    },
    async deleteProfile(user) {
        const profile = await User.findByIdAndUpdate(user._id, {isDeleted: true}, {new: true});
        return profile;
    },
    async restoreProfile(user) {
        const profile = await User.findByIdAndUpdate(user._id, {isDeleted: false}, {new: true});
        return profile;
    }
};


module.exports = UsersService;