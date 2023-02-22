const {server} = require('../index');
const {connection} = require('mongoose');

const Row = require('../api/database/models/Row');
const Shop = require('../api/database/models/Shop');
const User = require('../api/database/models/User');

const {shopHelper, userHelper, api} = require('./helpers');
const {initialUsers} = userHelper;
const {createShops} = shopHelper;

async function getOrCreateRow(shopId, token) {
    let row = await api.get(`/shops/${shopId}/rows`)
        .then(res => res.body);

    if (Object.keys(row).length === 0) {
        row = await api.post(`/shops/${shopId}/rows/start`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .then(res => res.body);
    }

    return row;
}

describe('Rows', () => {
    let ownerToken;
    let customerToken;

    beforeEach(async () => {
        await Shop.deleteMany({});
        await User.deleteMany({});
        await Row.deleteMany({});

        await createShops();

        const ownerUser = initialUsers.find(user => user.role === 'owner');
        const owner = await api.post('/auth/login')
            .send({
                email: ownerUser.email,
                password: ownerUser.password
            })
            .expect(200)
            .then(res => res.body);
        ownerToken = owner.accessToken.accessToken;

        const customerUser = initialUsers.find(user => user.role === 'customer');
        const customer = await api.post('/auth/login')
            .send({
                email: customerUser.email,
                password: customerUser.password
            })
            .expect(200)
            .then(res => res.body);
        customerToken = customer.accessToken.accessToken;
    });

    // OWNER
    describe('GET /rows', () => {
        test('should return an empty array if there are no rows', async () => {
            await api.get('/rows')
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toEqual([]);
                });
        });

        test('should return all rows', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.get('/rows')
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        test('should return a specific row', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.get(`/rows/${row.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body.id).toBe(row.id);
                });
        });

        test('should return a 404 if the row does not exist', async () => {
            await api.get('/rows/sdfgfdsgdrgsrdrgtrg')
                .expect(404);
        });
    });

    describe('POST /shops/:id/rows', () => {
        test('should create a new row with credentials', async () => {
            const shop = await api.get('/shops')
                .expect(200)
                .then(res => res.body.data[0]);
            
            await api.post(`/shops/${shop.id}/rows/start`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(201)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                });
        });

        test('should not create a new row without credentials', async () => {
            const shop = await api.get('/shops')
                .expect(200)
                .then(res => res.body.data[0]);

            await api.post(`/shops/${shop.id}/rows/start`)
                .send()
                .expect(401);
        });

        test('should not create a new row with invalid credentials', async () => {
            const shop = await api.get('/shops')
                .expect(200)
                .then(res => res.body.data[0]);

            await api.post(`/shops/${shop.id}/rows`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(403);
        });

        test('should not create a new row with invalid shop id', async () => {
            await api.post('/shops/5f1e0e8f9d3c3a1d0c3c2c3b/rows')
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(404);
        });

        test('should not create a new row if the shop already has one', async () => {
            const shop = await api.get('/shops')
                .expect(200)
                .then(res => res.body.data[0]);

            await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/shops/${shop.id}/rows/start`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(409);
        });
    });

    describe('PUT /rows/:id', () => {
        test('should stop a row', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                    expect(res.body.status).toBe('closed');
                });
        });

        test('should resume a row', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/);

            await api.put(`/shops/${shop.id}/rows/resume`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                    expect(res.body.status).toBe('open');
                });
        });

        test('should not stop a row without credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .send()
                .expect(401);
        });

        test('should not stop a row with invalid credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(403);
        });

        test('should not stop a row with invalid row id', async () => {
            await api.put('/shops/5f1e0e8f9d3c3a1d0c3c2c3b/rows/stop')
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(404);
        });

        test('should not stop a row if the row is already stopped', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(409);
        });

        test('should not resume a row without credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/resume`)
                .send()
                .expect(401);
        });

        test('should not resume a row with invalid credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/resume`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(403);
        });
    });

    describe('DELETE /rows/:id', () => {
        test('should delete a row', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.delete(`/shops/${shop.id}/rows/finish`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                });

            await api.get(`/rows/${row.id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(404);
        });

        test('should not delete a row without credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.delete(`/shops/${shop.id}/rows/finish`)
                .send()
                .expect(401);
        });

        test('should not delete a row with invalid credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            await getOrCreateRow(shop.id, ownerToken);

            await api.delete(`/shops/${shop.id}/rows/finish`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(403);
        });

        test('should not delete a row with invalid row id', async () => {
            await api.delete('/shops/erpoitgkasdgsoertgkjoerktg/rows/finish')
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(404);
        });
    });

    // CUSTOMER

    describe('POST /rows/:id/customers', () => {
        test('a customer should be able to join a row', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                    expect(res.body.customers).toHaveLength(1);
                });
        });

        test('a customer should not be able to join a row without credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .send()
                .expect(401);
        });

        test('a customer should not be able to join a row with invalid credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(403);
        });

        test('a customer should not be able to join a row with invalid row id', async () => {
            await api.post('/rows/5f1e0e8f9d3c3a1d0c3c2c3b/join')
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(404);
        });

        test('a customer should not be able to join a row if the row is stopped', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(409);
        });

        test('if a customer is already in a row, the customer\'s row item should be updated', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.get(`/rows/${row.id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                    expect(res.body.customers).toHaveLength(1);
                });
        });
    });

    describe('DELETE /rows/:id/customers', () => {
        test('a customer should be able to leave a row', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.delete(`/rows/${row.id}/leave`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body.row).toHaveProperty('id');
                    expect(res.body.row).toHaveProperty('shop');
                    expect(res.body.row).toHaveProperty('customers');
                    expect(res.body.row.customers).toHaveLength(0);
                });
        });

        test('a customer should not be able to leave a row without credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.delete(`/rows/${row.id}/leave`)
                .send()
                .expect(401);
        });

        test('a customer should not be able to leave a row with invalid credentials', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.delete(`/rows/${row.id}/leave`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(403);
        });

        test('a customer should not be able to leave a row with invalid row id', async () => {
            await api.delete('/rows/5f1e0e8f9d3c3a1d0c3c2c3b/leave')
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(404);
        });

        test('a customer should not be able to leave a row if the row is stopped', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.put(`/shops/${shop.id}/rows/stop`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200);

            await api.delete(`/rows/${row.id}/leave`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(409);
        });

        test('if a customer is not in a row, the customer\'s row item should not be updated', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.delete(`/rows/${row.id}/leave`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(404);

            await api.get(`/rows/${row.id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                    expect(res.body.customers).toHaveLength(0);
                });
        });

        test('if a customer is in a row, the customer\'s row item should be deleted', async () => {
            const shop = await api.get('/shops')
                .then(res => res.body.data[0]);
            const row = await getOrCreateRow(shop.id, ownerToken);

            await api.post(`/rows/${row.id}/join`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.delete(`/rows/${row.id}/leave`)
                .set('Authorization', `Bearer ${customerToken}`)
                .send()
                .expect(200);

            await api.get(`/rows/${row.id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send()
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('shop');
                    expect(res.body).toHaveProperty('customers');
                    expect(res.body.customers).toHaveLength(0);
                });
        });
    });

    afterAll(async () => {
        server.close();
        await connection.close();
    });
});