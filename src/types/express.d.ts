import { Request } from 'express';
import { IUserDocument } from './User';

declare global {
    namespace Express {
        interface User extends IUserDocument {}
    }
}

export interface AuthenticatedRequest extends Request {
    user: IUserDocument;
}
