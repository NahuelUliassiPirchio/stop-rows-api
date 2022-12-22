require('../src/api/database/mongodb');

const express = require('express');
const config = require('./api/config');
const errorHandler = require('./api/middlewares/errorHandler');

const PORT = config.port;

const v1Router = require('./api/v1/routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(//'/v1',
    v1Router);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});