const database = process.env.NODE_ENV === 'test' ? require('./dummy') : require('./dummy');

module.exports = database;