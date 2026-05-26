import { Request, Response, NextFunction } from 'express';
import ApiError from '../../common/ApiError';

interface AppError extends Error {
    status?: number;
    code?: number;
    errors?: Record<string, { message: string }>;
}

const errorHandler = (err: AppError, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err.message);
    const error = new ApiError('Internal Server Error', 500);

    if (err.name === 'UnauthorizedError') {
        error.message = 'Invalid Token';
        error.status = 401;
    }

    if (err.name === 'ValidationError' && err.errors) {
        error.message = Object.values(err.errors).map(val => val.message).join(', ');
        error.status = 400;
    }

    if (err.name === 'CastError' || err.message?.includes('not found')) {
        error.message = 'Resource not found';
        error.status = 404;
    }

    if (err.code === 11000 && err.name === 'MongoServerError') {
        error.message = 'Duplicate field value entered';
        error.status = 409;
    }

    if (err.message?.includes('is already') || err.message?.includes('is not')) {
        error.message = err.message;
        error.status = 409;
    }

    return res.status(error.status).json({ message: error.message });
};

export default errorHandler;
