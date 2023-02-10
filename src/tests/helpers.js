const superTest = require('supertest');
const {app} = require('../index');

const api = superTest(app);


const initialUsers = [
    {
        username: 'test',
        email: 'test@test.com',
        name: 'Test',
        password: '123456',
        role: 'customer'
    }
];

const basicUser = {
    username: 'basic',
    email: 'basic@test.com',
    name: 'Basic',
    password: '123456',
    role: 'customer'
};

module.exports = {
    initialUsers,
    basicUser,
    api
};