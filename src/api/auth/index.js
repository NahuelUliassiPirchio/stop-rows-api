const passport = require('passport');

const LocalStrategy = require('./strategies/localStrategy');
const JwtStrategy = require('./strategies/jwtStategy');
const RefreshJwtStrategy = require('./strategies/refreshJwtStategy');

passport.use(LocalStrategy);
passport.use('jwt', JwtStrategy);
passport.use('jwt-refresh', RefreshJwtStrategy);