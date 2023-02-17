const {connection} = require('mongoose');
const {server} = require('../index');
const Shop = require('../api/database/models/Shop');
const User = require('../api/database/models/User');

const { shopHelper, basicUser, api } = require('./helpers');
const { createShops, getAllShopsContent, initialShops, basicShop } = shopHelper;
    

describe('Shops', () => {
    beforeEach(async () => {
        await Shop.deleteMany({});
        await User.deleteMany({});

        await createShops();
    });

    describe('GET /shops', () => {
        test('should return all shops', async () => {
            await api.get('/shops')
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body.data).toHaveLength(initialShops.length);
                });
        });

        test('should return a specific shop', async () => {
            const shops = await getAllShopsContent();

            const shop = shops[0];

            await api.get(`/shops/${shop.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body).toEqual(shop);
                });
        });

        test('should return a 404 if the shop does not exist', async () => {
            await api.get('/shops/5f1e0e8f9d3c3a1d0c3c2c3b')
                .expect(404);
        });
    });

    describe('POST /shops', () => {
        test('should create a new shop', async () => {
            const user = await api.get('/users')
                .expect(200)
                .then(res => res.body[0]);
            
            const shop = basicShop;
            shop.owner = user.id;

            await api.post('/shops')
                .send(shop)
                .expect(201)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    const newShop = res.body;
                    expect(newShop.name).toEqual(shop.name);
                    expect(newShop.owner).toEqual(shop.owner);
                });
        });

        test('should return a 400 if the shop is invalid', async () => {
            const user = await api.post('/users')
                .send(basicUser)
                .expect(201)
                .then(res => res.body);

            const shop = basicShop;
            shop.owner = user.id;
            
            delete shop.name;

            await api.post('/shops')
                .send(shop)
                .expect(400);
        });
    });

    describe('PUT /shops/:id', () => {
        test('should update a shop', async () => {
            const shops = await getAllShopsContent();
            const shop = shops[0];
            
            shop.name = 'New name';

            await api.put(`/shops/${shop.id}`)
                .send({name: shop.name})
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .then(res => {
                    expect(res.body.name).toEqual(shop.name);
                });
        });

        test('should return a 400 if the shop is invalid', async () => {
            const shops = await getAllShopsContent();
            const shop = shops[0];
            
            shop.name = '';

            await api.put(`/shops/${shop.id}`)
                .send(shop)
                .expect(400);
        });

        test('should return a 404 if the shop does not exist', async () => {
            const shop = basicShop;

            await api.put('/shops/asdfsdafsfsfafsdfsdfsadf')
                .send(shop)
                .expect(404)
                .expect('Content-Type', /application\/json/)
                .then(res => res.body);
        });
    });

    describe('DELETE /shops/:id', () => {
        test('should delete a shop', async () => {
            const shops = await getAllShopsContent();
            const shop = shops[0];

            await api.delete(`/shops/${shop.id}`)
                .expect(200);
        });

        test('should return a 404 if the shop does not exist', async () => {
            await api.delete('/shops/sdfdsafsadfsfsf')
                .expect(404)
                .expect('Content-Type', /application\/json/)
                .then(res => res.body);
        });
    });

    afterAll(() => {
        connection.close();
        server.close();
    });
});