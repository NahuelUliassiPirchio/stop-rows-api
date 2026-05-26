import superTest from 'supertest';
import {app} from '../index';
import { ShopInput } from '../types/Shop';

const api = superTest(app);

const initialUsers = [
    {
        username: 'test',
        email: 'test@test.com',
        name: 'Test',
        password: '123456',
        role: 'owner'
    },
    {
        username: 'john',
        email: 'john@test.com',
        name: 'John',
        password: '123456',
        role: 'owner'
    },
    {
        username: 'jane',
        email: 'jane@test.com',
        name: 'Jane',
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

const createUsers = async () => {
    const users = await Promise.all(initialUsers.map(user => {
        return api
            .post('/users')
            .send(user)
            .expect(201)
            .then(res => res.body);
    }));

    return users;
};


const initialShops: ShopInput[] = [
    {
        name: 'Test Shop',
        address: 'Test Address',
        phone: '123456789',
        email: 'testshop@test.com',
        description: 'Test Description',
        website: 'https://testshop.com',
        logo: 'https://testshop.com/logo.png',
        location: { type: 'Point', coordinates: [0, 0] },
        categories: [],
    },
    {
        name: 'John Shop',
        address: 'John Address',
        phone: '987654321',
        email: 'testjohnshop@test.com',
        description: 'John Description',
        website: 'https://johnshop.com',
        logo: 'https://johnshop.com/logo.png',
        location: { type: 'Point', coordinates: [0, 0] },
        categories: [],
    },
];

const basicShop: ShopInput = {
    name: 'Basic Shop',
    address: 'Basic Address',
    phone: '123456789',
    email: 'basicshop@test.com',
    description: 'Basic Description',
    website: 'https://basicshop.com',
    logo: 'https://basicshop.com/logo.png',
    location: { type: 'Point', coordinates: [0, 0] },
    categories: [],
};

const createShops = async () => {
    const users = await createUsers();

    const shops = await Promise.all(initialShops.map(shop => {
        return api
            .post('/shops')
            .send({ ...shop, owner: users[0].id })
            .expect(201)
            .then(res => res.body);
    }));

    return shops;
};

const getAllShops = async () => {
    const shops = await api
        .get('/shops')
        .expect(200)
        .then(res => res.body.data);
    
    return shops;
};


const shopHelper = {
    initialShops,
    basicShop,
    createShops,
    getAllShopsContent : getAllShops
};

const userHelper = {
    initialUsers,
    basicUser,
    createUsers
};

export {
    userHelper,
    shopHelper,
    api,
    basicUser
};