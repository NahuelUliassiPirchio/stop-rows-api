const database = require('../../../database/index');

class UsersService {
    constructor() {
        this.table = 'users';
    }

    async getAllUsers() {
        const users = await database.getAll(this.table);
        return users;
    }

    async getUserById(id) {
        const user = await database.getById(this.table, id);
        return user;
    }

    async addUser(user) {
        const newUser = await database.add(this.table, user);
        return newUser;
    }

    async updateUser(id, user) {
        const updatedUser = await database.update(this.table, id, user);
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await database.delete(this.table, id);
        return deletedUser;
    }
}

module.exports = UsersService;