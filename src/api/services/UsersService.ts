import User from '../database/models/User';
import { hashPassword } from '../../common/Encryption';
import { IUserDocument, UserInput, UpdateUserInput } from '../../types/User';

const UsersService = {
    async getAllUsers(): Promise<IUserDocument[]> {
        return User.find().populate('shops');
    },

    async getUserById(id: string): Promise<IUserDocument> {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    },

    async getUserByEmail(email: string): Promise<IUserDocument | null> {
        try {
            return await User.findOne({ email });
        } catch {
            return null;
        }
    },

    async addUser(user: UserInput): Promise<IUserDocument> {
        user.password = await hashPassword(user.password);
        return User.create(user);
    },

    async updateUser(id: string, user: UpdateUserInput): Promise<IUserDocument | null> {
        if (user.password) {
            user.password = await hashPassword(user.password);
        }
        return User.findByIdAndUpdate(id, user, { new: true });
    },

    async deleteUser(id: number): Promise<IUserDocument | null> {
        return User.findByIdAndDelete(id);
    },

    async getProfile(user: IUserDocument): Promise<IUserDocument | null> {
        return User.findById(user._id).populate('shops');
    },

    async updateProfile(user: IUserDocument, body: UpdateUserInput): Promise<IUserDocument | null> {
        return User.findByIdAndUpdate(user._id, body, { new: true });
    },

    async deleteProfile(user: IUserDocument): Promise<IUserDocument | null> {
        return User.findByIdAndUpdate(user._id, { isDeleted: true }, { new: true });
    },

    async restoreProfile(user: IUserDocument): Promise<IUserDocument | null> {
        return User.findByIdAndUpdate(user._id, { isDeleted: false }, { new: true });
    },
};

export default UsersService;
