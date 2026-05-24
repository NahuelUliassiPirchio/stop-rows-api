import { Document, Types } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    username: string;
    password: string;
    role: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    shops: Types.ObjectId[];
    row: Types.ObjectId[];
}

export interface IUserDocument extends IUser, Document {}

export type UserInput = Pick<IUser, 'name' | 'email' | 'username' | 'password'> & { role?: string };
export type UpdateUserInput = Partial<Pick<IUser, 'name' | 'email' | 'username' | 'password'>>;
