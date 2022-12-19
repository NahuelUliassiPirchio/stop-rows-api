const mongoose = require('mongoose');
const config = require('../config');

mongoose.set('strictQuery', true);

mongoose.connect(config.db.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = mongoose;