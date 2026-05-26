import { Document, Types } from 'mongoose';

export interface IShopLocation {
    type: 'Point';
    coordinates: [number, number];
}

export interface IShop {
    name: string;
    description: string;
    email: string;
    address: string;
    phone: string;
    website: string;
    owner: Types.ObjectId;
    logo: string;
    location: IShopLocation;
    createdAt: Date;
    updatedAt: Date;
    categories: Types.ObjectId[];
    row?: Types.ObjectId;
}

export interface IShopDocument extends IShop, Document {}

export type ShopInput = Omit<IShop, 'owner' | 'createdAt' | 'updatedAt'>;

export interface IShopQuery {
    search: string;
    page: number;
    limit: number;
    status: 'open' | 'closed';
    category: string;
    categories: string[];
    lat: number;
    lng: number;
}
