const { connection } = require('mongoose');
const { server } = require('../index');
const User = require('../api/database/models/User');

const {userHelper, api} = require('./helpers');
const {createUsers, initialUsers, basicUser} = userHelper;
const jwt = require('jsonwebtoken');

describe('Auth', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await createUsers();
    });

    describe('Signup', () => {
        test('should return 200 and tokens when signing up', async () => {
            const response = await api.post('/auth/signup')
                .send(
                    {
                        ...basicUser,
                    }
                )
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
        });

        test('should return 419 for attempting to create a user with an existing username', async () => {
            const userToCreate = {
                username: initialUsers[0].username,
                email: 'other@test.com',
                name: 'other',
                password: 'others',
                role: 'customer'
            };

            await api.post('/auth/signup')
                .send(userToCreate)
                .expect(419);
        });

        test('should return 419 for attempting to create a user with an existing email', async () => {
            const userToCreate = {
                username: 'other',
                email: initialUsers[0].email,
                name: 'other',
                password: 'others',
                role: 'customer'
            };

            await api.post('/auth/signup')
                .send(userToCreate)
                .expect(419);
        });
    });
        
    describe('Login', () => {
        test('should return 401 for logging in with invalid credentials', async () => {
            await api.post('/auth/login')
                .send({
                    email: initialUsers[0].email,
                    password: 'wrongpassword'
                })
                .expect(401);
        });

        test('should return 200 and tokens for logging in with valid credentials', async () => {
            const response = await api.post('/auth/login')
                .send({
                    email: initialUsers[0].email,
                    password: initialUsers[0].password
                })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(response.body).toHaveProperty('accessToken');
            expect(response.body).toHaveProperty('refreshToken');
        });
    });

    describe('Refresh', () => {
        test('should return 200 and new tokens for refreshing with a valid refresh token', async () => {

            const loginResponse = await api.post('/auth/login')
                .send({
                    email: initialUsers[0].email,
                    password: initialUsers[0].password
                });

            const refreshToken = loginResponse.body.refreshToken;

            const refreshResponse = await api.post('/auth/refresh')
                .set('Authorization', `Bearer ${refreshToken}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            
            expect(refreshResponse.body).toHaveProperty('accessToken');
        });

        test('should return 401 for refreshing with an invalid refresh token', async () => {
            await api.post('/auth/refresh')
                .set('Authorization', 'Bearer invalidtoken')
                .expect(401);
        });

        test('should return 401 for refreshing with an expired refresh token', async () => {
            const loginResponse = await api.post('/auth/login')
                .send({
                    email: initialUsers[0].email,
                    password: initialUsers[0].password
                });

            const refreshToken = loginResponse.body.refreshToken;
            const decodedToken = jwt.decode(refreshToken);
            decodedToken.exp = 0;
            const expiredToken = jwt.sign(decodedToken, process.env.JWT_SECRET);

            await api.post('/auth/refresh')
                .set('Authorization', `Bearer ${expiredToken}`)
                .expect(401);
        });
    });

    afterAll(() => {
        connection.close();
        server.close();
    });
});