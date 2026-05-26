import { Document } from 'mongoose';

export interface ICategory {
    name: string;
}

export interface ICategoryDocument extends ICategory, Document {}

export type CategoryInput = Pick<ICategory, 'name'>;
