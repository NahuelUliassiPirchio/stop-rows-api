const Row = require('../database/models/Row');
const Shop = require('../database/models/Shop');

const RowsService = {
    async getAllRows() {
        const rows = await Row.find().populate('shop').populate('customers.user');
        return rows;
    },
    async getRowById(id) {
        const row = await Row.findById(id).populate('shop').populate('customers.user');
        return row;
    },
    async addRow(row, shopId) {
        row.shop = shopId;
        const newRow = await Row.create(row);
        const shop = await Shop.findById(shopId);
        if (shop.row) {
            await Row.findByIdAndRemove(shop.row);
        }
        shop.row = newRow._id;
        await shop.save();
        return newRow;
    },
    async resumeRow(id) {
        const resumedRow = await Row.findOne({shop: id});
        if (!resumedRow) throw new Error('Row not found');
        if (resumedRow.status === 'open') throw new Error('The row is already open');
        resumedRow.status = 'open';
        resumedRow.save();
        return resumedRow;
    },
    async stopRow(id) {
        const stoppedRow = await Row.findOne({shop: id});
        if (!stoppedRow) throw new Error('Row not found');
        if (stoppedRow.status === 'closed') throw new Error('The row is already closed');
        stoppedRow.status = 'closed';
        stoppedRow.save();
        return stoppedRow;
    },
    async updateRow(id, row) {
        const stoppedRow = await Row.findOneAndUpdate({shop: id}, row, {new: true});
        if (!stoppedRow) throw new Error('Row not found');
        return stoppedRow;
    },
    async deleteRow(shopId) {
        const shop = await Shop.findById(shopId);
        if (!shop) throw new Error('Shop not found');
        if (!shop.row) throw new Error('Row not found');
        await Row.findByIdAndRemove(shop.row._id);
        shop.row = null;
        return await shop.save();
    },
    async userJoinRow(id, user) {
        const row = await Row.findById(id);
        if (!row) throw new Error('Row not found');
        if (row.status === 'closed') throw new Error('The row is not open');
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
        if (!row) throw new Error('Row not found');
        if (row.status === 'closed') throw new Error('The row is not open');
        if (!row.customers.some(customer => customer.user._id.toString() === user._id.toString())) {
            throw new Error('User not found in the row');
        } 

        row.customers = row.customers.filter(customer => customer.user._id.toString() !== user._id.toString());
        row.save();
        user.row = null;
        user.save();
        return {row, user};
    },
};

module.exports = RowsService;