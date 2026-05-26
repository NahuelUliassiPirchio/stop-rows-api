import { Response, NextFunction } from 'express';
import { UserRole } from '../../types/User';
import { AuthenticatedRequest } from '../../types/express';

const hasRole = (roles: UserRole[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};

export default hasRole;
