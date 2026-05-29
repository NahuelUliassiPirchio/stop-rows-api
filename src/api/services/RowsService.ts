import { IRowCustomer, IRowDocument, RowInput } from '../../types/Row';
import { IUserDocument } from '../../types/User';
import Row from '../database/models/Row';
import Shop from '../database/models/Shop';
import ShopsService from './ShopsService';

const RowsService = {
    async getAllRows(): Promise<IRowDocument[]> {
        return Row.find().populate('shop').populate('customers.user');
    },

    async getRowById(id: string): Promise<IRowDocument | null> {
        return Row.findById(id).populate('shop').populate('customers.user');
    },

    async getRowByShopId(shopId: string): Promise<IRowDocument | null> {
        return Row.findOne({ shop: shopId }).populate('shop').populate('customers.user');
    },

    async addRow(row: RowInput, shopId: string): Promise<IRowDocument> {
        const shop = await Shop.findById(shopId);
        if (!shop) throw new Error('Shop not found');
        if (shop.row) throw new Error('The row is already started');
        const newRow = await Row.create({ ...row, shop: shopId });
        shop.row = newRow._id;
        await shop.save();
        ShopsService.invalidateShopCache(shopId);
        return newRow;
    },

    async resumeRow(id: string): Promise<IRowDocument> {
        const row = await Row.findOne({ shop: id });
        if (!row) throw new Error('Row not found');
        if (row.status === 'open') throw new Error('The row is already open');
        row.status = 'open';
        ShopsService.invalidateShopCache(id);
        return row.save();
    },

    async stopRow(id: string): Promise<IRowDocument> {
        const row = await Row.findOne({ shop: id });
        if (!row) throw new Error('Row not found');
        if (row.status === 'closed') throw new Error('The row is already closed');
        row.status = 'closed';
        ShopsService.invalidateShopCache(id);
        return row.save();
    },

    async updateRow(id: string, row: RowInput): Promise<IRowDocument> {
        const updatedRow = await Row.findOneAndUpdate({ shop: id }, row, { new: true });
        if (!updatedRow) throw new Error('Row not found');
        return updatedRow;
    },

    async deleteRow(shopId: string): Promise<IRowDocument> {
        const shop = await Shop.findById(shopId);
        if (!shop) throw new Error('Shop not found');
        if (!shop.row) throw new Error('Row not found');
        const deletedRow = await Row.findByIdAndDelete(shop.row);
        if (!deletedRow) throw new Error('Row not found');
        shop.row = undefined;
        await shop.save();
        ShopsService.invalidateShopCache(shopId);
        return deletedRow;
    },

    async userJoinRow(id: string, user: IUserDocument): Promise<IRowDocument> {
        const row = await Row.findById(id);
        if (!row) throw new Error('Row not found');
        if (row.status === 'closed') throw new Error('The row is not open');
        row.customers = row.customers.filter(
            (customer: IRowCustomer) => customer.user.toString() !== user._id.toString()
        );
        row.customers.push({ user: user._id, date: new Date() });
        await row.save();
        if (!user.row.some(r => r.toString() === row._id.toString())) {
            user.row.push(row._id);
            await user.save();
        }
        return row;
    },

    async userLeaveRow(id: string, user: IUserDocument): Promise<{ row: IRowDocument; user: IUserDocument }> {
        const row = await Row.findById(id);
        if (!row) throw new Error('Row not found');
        if (row.status === 'closed') throw new Error('The row is not open');
        if (!row.customers.some((customer: IRowCustomer) => customer.user.toString() === user._id.toString())) {
            throw new Error('User not found in the row');
        }
        row.customers = row.customers.filter(
            (customer: IRowCustomer) => customer.user.toString() !== user._id.toString()
        );
        await row.save();
        user.row = user.row.filter(r => r.toString() !== row._id.toString());
        await user.save();
        return { row, user };
    },
};

export default RowsService;
