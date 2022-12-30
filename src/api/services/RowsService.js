const Row = require('../database/models/Row');

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
        const deletedRow = await Row.findOneAndRemove({shop: id});
        return deletedRow;
    },
    async userJoinRow(id, user) {
        const row = await Row.findById(id);
        if (row.status === 'closed') throw new Error('The row is closed');
        if (row.customers.some(customer => customer.user._id.toString() === user._id.toString())) {
            row.customers = row.customers.filter(customer => customer.user._id.toString() !== user._id.toString());
        }
        row.customers.push({user, date: new Date()});
        row.save();
        user.row = row._id;
        user.save();
        return row;
    },
    async userLeaveRow(id, user) {
        const row = await Row.findById(id);
        if (row.status === 'closed') throw new Error('The row is closed');
        if (!row.customers.includes(user)) throw new Error('User is not in the row');

        row.customers = row.customers.filter(customer => customer.user._id !== user._id);
        row.save();
        user.row = null;
        user.save();
        return {row, user};
    },
};

module.exports = RowsService;