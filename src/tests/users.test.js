const {connection} = require('mongoose');
const {server} = require('../index');
const User = require('../api/database/models/User');

const {basicUser, initialUsers, api} = require('./helpers');

beforeEach(async () => {
    await User.deleteMany({});
    const user = new User(initialUsers[0]);
    await user.save();
});

test('users should be json', async () => { 
    await api.get('/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('should return 404 for non-existing user', async () => {
    await api.get('/users/123')
        .expect(404);
});

test('should return 200 for existing user', async () => {
    const user = await api.get('/users/');
    const id = user.body[0].id;
    await api.get(`/users/${id}`)
        .expect(200);
});

test('should return 419 for attempting to create a user with an existing username', async () => {
    
    const userToCreate = {
        username: initialUsers[0].username,
        email: basicUser.email,
        name: basicUser.name,
        password: basicUser.password,
        role: basicUser.role
    };

    await api.post('/users')
        .send(userToCreate)
        .expect(419);
});

test('should return 419 for attempting to create a user with an existing email', async () => {
    const userToCreate = {
        ...basicUser,
        email: initialUsers[0].email,
    };

    await api.post('/users')
        .send(userToCreate)
        .expect(419);
});

test('all users with customer role should have no shops', async ()=> {
    const users = await api.get('/users/');
    const customers = users.body.filter(user => user.role === 'customer');
    customers.forEach(customer => {
        expect(customer.shops).toHaveLength(0);
    });
});

test('should return 400 for attempting to create a user with an invalid role', async () => {
    const userToCreate = {
        ...basicUser,
        role: 'invalid'
    };
    await api.post('/users')
        .send(userToCreate)
        .expect(400);
});

test('should return 400 for attempting to create a user with an invalid email', async () => {
    const userToCreate = {
        ...basicUser,
        email: 'invalid',
    };
    await api.post('/users')
        .send(userToCreate)
        .expect(400);
});

test('should return 201 for creating a user', async () => {
    await api.post('/users')
        .send(basicUser)
        .expect(201);
});

test('should return 200 for updating a user', async () => {
    const user = await api.get('/users/');
    const id = user.body[0].id;
    await api.put(`/users/${id}`)
        .send(basicUser)
        .expect(200);
});

test('should return 200 for deleting a user', async () => {
    const user = await api.get('/users/');
    const id = user.body[0].id;
    await api.delete(`/users/${id}`)
        .expect(200);
});

test('should return 404 for a deleted user', async () => {
    const user = await api.get('/users/');
    const id = user.body[0].id;
    await api.delete(`/users/${id}`);
    await api.get(`/users/${id}`)
        .expect(404);
});

afterAll(() => {
    connection.close();
    server.close();
});