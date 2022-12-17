let dummyDatabase = {
    users: [
        {
            id: 1,
            name: 'John Doe',
            email: 'johnny@gmail.com',
            role: 'admin',
            nickname: 'johnny',
            password: '123456'
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jana@gmail.com',
            role: 'user',
            nickname: 'jana',
            password: '123456'
        }
    ]
};

const getAll = (table) => {
    return dummyDatabase[table];
};

const getById = (table, id) => {
    const collection = dummyDatabase[table];
    return collection.find(item => item.id === id);
};

const add = (table, data) => {
    if(!data) return;
    const collection = dummyDatabase[table];
    data.id = collection.length + 1;
    collection.push(data);
    return data;
};

const update = (table, id, data) => {
    const collection = dummyDatabase[table];
    const index = collection.findIndex(item => item.id === id);
    const updated = Object.assign(collection[index], data);
    return updated;
};

const deleteItem = (table, id) => {
    const collection = dummyDatabase[table];
    const index = collection.findIndex(item => item.id === id);
    const deleted = collection.splice(index, 1);
    return deleted;
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    delete: deleteItem
};