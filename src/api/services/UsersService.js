const User = require('../database/models/User');

const UsersService = {
    async getAllUsers() {
        const users = await User.find().populate('shops');
        return users;        
    },
    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },
    async addUser(user) {
        const createdUser = await User.create(user);
        return createdUser;
    },
    async updateUser(id, user) {
        const updatedUser = await User.findByIdAndUpdate(id, user,
            {new: true});
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    },
    async deleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    },
};


module.exports = UsersService;