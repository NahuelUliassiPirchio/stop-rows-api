import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest, VerifiedCallback } from 'passport-jwt';

import usersService from '../../services/UsersService';
import config from '../../config';

if (!config.jwt.refreshSecret) throw new Error('JWT_REFRESH_SECRET is not defined');

const options: StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.refreshSecret,
};

interface JwtPayload {
    id: string;
    role: string;
}

const jwtStrategy = new Strategy(
    options,
    async (payload: JwtPayload, done: VerifiedCallback) => {
        try {
            const user = await usersService.getUserById(payload.id);
            if (!user) {
                return done(null, false, {message: 'Incorrect email'});
            }
            return done(null, user);
        } catch (err) {
            return done(err as Error);
        }
    }
);

export default jwtStrategy;