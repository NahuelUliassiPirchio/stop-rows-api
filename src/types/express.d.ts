import { Request } from 'express';
import { IUserDocument } from './User';

declare global {
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface User extends IUserDocument {}
    }
}

export interface AuthenticatedRequest extends Request {
    user: IUserDocument;
}
