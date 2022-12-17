const express = require('express');
const PORT = process.env.PORT || 3001;

const v1Router = require('./api/v1/routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(//'/v1',
    v1Router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});