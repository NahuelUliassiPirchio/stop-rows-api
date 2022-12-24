const {ExtractJwt, Strategy} = require('passport-jwt');

const usersService = require('../../services/UsersService');
const config = require('../../config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
};

const jwtStrategy = new Strategy(
    options,
    async (payload, done) => {
        try {
            const user = await usersService.getUserById(payload.id);
            if (!user) {
                return done(null, false, {message: 'Incorrect email'});
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
);

module.exports = jwtStrategy;