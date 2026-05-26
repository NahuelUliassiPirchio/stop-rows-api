import passport from 'passport';

import LocalStrategy from './strategies/localStrategy';
import JwtStrategy from './strategies/jwtStategy';
import RefreshJwtStrategy from './strategies/refreshJwtStategy';

passport.use(LocalStrategy);
passport.use('jwt', JwtStrategy);
passport.use('jwt-refresh', RefreshJwtStrategy);