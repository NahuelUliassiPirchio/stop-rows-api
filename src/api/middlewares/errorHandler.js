const ApiError = require('../../common/ApiError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    let error = new ApiError('Internal Server Error', 500);

    if (err.name === 'UnauthorizedError') {
        error.message = 'Invalid Token';
        error.status = 401;
    }

    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors).map((val) => val.message);
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

module.exports = errorHandler;