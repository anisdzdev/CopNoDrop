const request = require('supertest');
const app = require("../app");
const {User} = require("../models/user_model");
const {deleteOne} = require("../services/users");

const user1 = {
    firstName: 'Super1',
    lastName: 'Test1',
    email: 'test1@test.com',
    password: 'test1231'
}

const user2 = {
    firstName: 'Super12',
    lastName: 'Test12',
    email: 'test12@test.com',
    password: 'test12312'
}

// afterEach(async () => {
// });

test('sign up user', async () => {
    await request(app).post('/users/signup').send({
        firstName: 'Amin',
        lastName: 'Boulemkahel',
        email: 'amin@gmail.com',
        password: 'aminbou12'
    }).expect(201);
})

test('login user', async () => {
    await request(app).post('/users/login').send({
        email: user1.email,
        password: user1.password
    }).expect(200);
})

test('modify user', async () => {
    const user1 = await request(app).post('/users/signup').send({
        firstName: 'Amin',
        lastName: 'Boulemkahel',
        email: 'amin@gmail.com',
        password: 'aminbou12'
    }).data;

    await request(app).put('/users/6220e5214aa8c162396fe6fc').send(user1);
})

