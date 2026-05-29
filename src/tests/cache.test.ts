import { connection } from 'mongoose';
import { server } from '../index';
import Category from '../api/database/models/Category';
import Shop from '../api/database/models/Shop';
import User from '../api/database/models/User';
import cache from '../api/services/CacheService';
import { api, shopHelper } from './helpers';

const { createShops } = shopHelper;

describe('Cache', () => {
    beforeEach(async () => {
        cache.clear();
        await Category.deleteMany({});
        await Shop.deleteMany({});
        await User.deleteMany({});
    });

    afterAll(() => {
        connection.close();
        server.close();
    });

    describe('Categories', () => {
        test('GET /categories serves second request from cache without hitting DB', async () => {
            await api.post('/categories').send({ name: 'Electronics' }).expect(201);

            const findSpy = jest.spyOn(Category, 'find');

            await api.get('/categories').expect(200); // cache miss → DB
            await api.get('/categories').expect(200); // cache hit → no DB

            expect(findSpy).toHaveBeenCalledTimes(1);
            findSpy.mockRestore();
        });

        test('GET /categories/:id serves second request from cache without hitting DB', async () => {
            const { body: category } = await api.post('/categories').send({ name: 'Electronics' }).expect(201);

            const findByIdSpy = jest.spyOn(Category, 'findById');

            await api.get(`/categories/${category.id}`).expect(200); // cache miss → DB
            await api.get(`/categories/${category.id}`).expect(200); // cache hit → no DB

            expect(findByIdSpy).toHaveBeenCalledTimes(1);
            findByIdSpy.mockRestore();
        });

        test('POST /categories invalidates the list cache', async () => {
            await api.get('/categories').expect(200); // prime cache

            const findSpy = jest.spyOn(Category, 'find');

            await api.post('/categories').send({ name: 'Electronics' }).expect(201); // invalidates
            await api.get('/categories').expect(200); // cache miss → DB called again

            expect(findSpy).toHaveBeenCalledTimes(1);
            findSpy.mockRestore();
        });

        test('PUT /categories/:id invalidates list and individual cache', async () => {
            const { body: category } = await api.post('/categories').send({ name: 'Electronics' }).expect(201);

            await api.get('/categories').expect(200);
            await api.get(`/categories/${category.id}`).expect(200);

            const findSpy = jest.spyOn(Category, 'find');
            const findByIdSpy = jest.spyOn(Category, 'findById');

            await api.put(`/categories/${category.id}`).send({ name: 'Updated' }).expect(200); // invalidates both
            await api.get('/categories').expect(200);
            await api.get(`/categories/${category.id}`).expect(200);

            expect(findSpy).toHaveBeenCalledTimes(1);
            expect(findByIdSpy).toHaveBeenCalledTimes(1);
            findSpy.mockRestore();
            findByIdSpy.mockRestore();
        });

        test('DELETE /categories/:id invalidates list and individual cache', async () => {
            const { body: category } = await api.post('/categories').send({ name: 'Electronics' }).expect(201);

            await api.get('/categories').expect(200);
            await api.get(`/categories/${category.id}`).expect(200);

            const findSpy = jest.spyOn(Category, 'find');

            await api.delete(`/categories/${category.id}`).expect(200); // invalidates both
            await api.get('/categories').expect(200);

            expect(findSpy).toHaveBeenCalledTimes(1);
            findSpy.mockRestore();
        });
    });

    describe('Shops', () => {
        test('GET /shops/:id serves second request from cache without hitting DB', async () => {
            const shops = await createShops();
            const shopId = shops[0].id;

            cache.clear(); // clear cache set during shop creation flow

            const findByIdSpy = jest.spyOn(Shop, 'findById');

            await api.get(`/shops/${shopId}`).expect(200); // cache miss → DB
            await api.get(`/shops/${shopId}`).expect(200); // cache hit → no DB

            expect(findByIdSpy).toHaveBeenCalledTimes(1);
            findByIdSpy.mockRestore();
        });

        test('PUT /shops/:id invalidates shop cache', async () => {
            const shops = await createShops();
            const shopId = shops[0].id;

            await api.get(`/shops/${shopId}`).expect(200); // prime cache

            const findByIdSpy = jest.spyOn(Shop, 'findById');

            await api.put(`/shops/${shopId}`).send({ name: 'Updated Name' }).expect(200); // invalidates
            await api.get(`/shops/${shopId}`).expect(200); // cache miss → DB called again

            expect(findByIdSpy).toHaveBeenCalledTimes(1);
            findByIdSpy.mockRestore();
        });
    });
});
