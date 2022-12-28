require('../src/api/database/mongodb');

const express = require('express');
const passport = require('passport');
const helmet = require('helmet');

const rateLimit = require('../src/api/middlewares/rateLimit');
const config = require('./api/config');
const errorHandler = require('./api/middlewares/errorHandler');

const PORT = config.port;

const v1Router = require('./api/v1/routes/index');

const app = express();

app.use(helmet());

app.use(rateLimit);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./api/auth');
app.use(passport.initialize());

app.use(//'/v1',
    v1Router);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});