const {Strategy} = require('passport-local');
const { comparePassword } = require('../../../common/Encryption');
const usersService = require('../../services/UsersService');

const localStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async ( email, password, done ) => {
        try {
            const user = await usersService.getUserByEmail(email);
            if (!user) {
                return done(null, false, {message: 'Incorrect email'});
            }
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
);

module.exports = localStrategy;