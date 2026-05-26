import { Document, Types } from 'mongoose';

export interface IRowCustomer {
    user: Types.ObjectId;
    date: Date;
}

export interface IRow {
    shop: Types.ObjectId;
    customers: IRowCustomer[];
    status: 'open' | 'closed';
    createdAt: Date;
}

export interface IRowDocument extends IRow, Document {}

export type RowInput = Omit<IRow, 'shop' | 'createdAt'>;
