const bcrypt = require('bcryptjs');
const config = require('../api/config');

const saltRounds = parseInt( config.auth.saltRounds);

const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword
};