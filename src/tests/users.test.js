const {connection} = require('mongoose');
const {server} = require('../index');
const User = require('../api/database/models/User');

const {userHelper, api} = require('./helpers');
const {createUsers, initialUsers, basicUser} = userHelper;

describe('Users', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await createUsers();
    });
    
    describe('GET /users', () => {
        test('should return 200 and users (json)', async () => { 
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
    });
        
    describe('POST /users', () => {
        test('should return 409 for attempting to create a user with an existing username', async () => {
                
            const userToCreate = {
                username: initialUsers[0].username,
                email: basicUser.email,
                name: basicUser.name,
                password: basicUser.password,
                role: basicUser.role
            };
            
            await api.post('/users')
                .send(userToCreate)
                .expect(409);
        });
            
        test('should return 409 for attempting to create a user with an existing email', async () => {
            const userToCreate = {
                ...basicUser,
                email: initialUsers[0].email,
            };
            
            await api.post('/users')
                .send(userToCreate)
                .expect(409);
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
    });

    describe('PUT /users', () => {
        test('should return 200 for updating a user', async () => {
            const user = await api.get('/users/');
            const id = user.body[0].id;
            await api.put(`/users/${id}`)
                .send(basicUser)
                .expect(200);
        });

        test('should return 404 for a non-existing user', async () => {
            await api.put('/users/123')
                .send(basicUser)
                .expect(404);
        });

        test('should return 400 for attempting to update a user with an invalid role', async () => {
            const user = await api.get('/users/');
            const id = user.body[0].id;
            const userToUpdate = {
                ...basicUser,
                role: 'invalid'
            };
            await api.put(`/users/${id}`)
                .send(userToUpdate)
                .expect(400);
        });

        test('should return 400 for attempting to update a user with an invalid email', async () => {
            const user = await api.get('/users/');
            const id = user.body[0].id;
            const userToUpdate = {
                ...basicUser,
                email: 'invalid'
            };
            await api.put(`/users/${id}`)
                .send(userToUpdate)
                .expect(400);
        });

        test('should return 409 for attempting to update a user with an existing username', async () => {
            const user = await api.get('/users/');
            const id = user.body[0].id;
            const userToUpdate = {
                ...basicUser,
                username: initialUsers[1].username
            };
            await api.put(`/users/${id}`)
                .send(userToUpdate)
                .expect(409);
        });

        test('should return 409 for attempting to update a user with an existing email', async () => {
            const user = await api.get('/users/');
            const id = user.body[0].id;
            const userToUpdate = {
                ...basicUser,
                email: initialUsers[1].email
            };
            await api.put(`/users/${id}`)
                .send(userToUpdate)
                .expect(409);
        });
    });

    describe('DELETE /users', () => {    
        test('should return 200 for deleting a user', async () => {
            const user = await api.get('/users/');
            const id = user.body[0].id;
            await api.delete(`/users/${id}`)
                .expect(200);
        });

        test('should return 404 for a non-existing user', async () => {
            await api.delete('/users/123')
                .expect(404);
        });
            
        test('should return 404 for a deleted user', async () => {
            const user = await api.get('/users/');
            const id = user.body[0].id;
            await api.delete(`/users/${id}`);
            await api.get(`/users/${id}`)
                .expect(404);
        });
    });
    
    afterAll(() => {
        connection.close();
        server.close();
    });
});