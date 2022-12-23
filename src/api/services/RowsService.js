const Row = require('../database/models/Row');
const usersService = require('./UsersService');

const RowsService = {
    async getAllRows() {
        const rows = await Row.find().populate('shop');
        return rows;
    },
    async getRowById(id) {
        const row = await Row.findById(id);
        return row;
    },
    async addRow(row, shopId) {
        row.shop = shopId;
        const newRow = await Row.create(row);
        return newRow;
    },
    async resumeRow(id) {
        const resumedRow = await Row.findOne({shop: id, status: 'closed'});
        resumedRow.status = 'open';
        resumedRow.save();
        return resumedRow;
    },
    async stopRow(id) {
        const stoppedRow = await Row.findOne({shop: id, status: 'open'});
        stoppedRow.status = 'closed';
        stoppedRow.save();
        return stoppedRow;
    },
    async updateRow(id, row) {
        const updatedRow = await Row.findByIdAndUpdate(id, row, {new: true});
        return updatedRow;
    },
    async deleteRow(id) {
        const deletedRow = await Row.findByIdAndDelete(id);
        return deletedRow;
    },
    async userJoinRow(id, userId) {
        const row = await Row.findById(id);
        const user = await usersService.getUserById(userId);
        row.customers.push({user: userId, date: new Date()});
        row.save();
        user.row = row._id;
        user.save();
        return row;
    },
    async userLeaveRow(id, userId) {
        const row = await Row.findById(id);
        const user = await usersService.getUserById(userId);
        row.customers = row.customers.filter(customer => customer.user !== userId);
        row.save();
        user.row = null;
        user.save();
        return row;
    },
};

module.exports = RowsService;