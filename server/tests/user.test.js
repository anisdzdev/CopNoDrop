const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose')
const jwt_decode = require('jwt-decode');

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let connection of collections) {
        await connection.deleteMany({});
    }
    await mongoose.connection.close()
})

describe("GET /users/:id", () => {
    test("The user id should be found, with the exact information and return success", async () => {
        const newUser = await request(app).post('/users/signup').send({
            "firstName": "Amin",
            "lastName": "Boulemkahel",
            "email": "amin@test.com",
            "password": "aminbou12",
            "isSeller": true
        });

        const token = newUser.text;
        const decodedId = jwt_decode(token)._id;

        const response = await request(app).get(`/users/${decodedId}`);
        expect(response.body).toEqual({
            "_id": decodedId,
            "addresses": [],
            "avatar": "default.jpg",
            "email": "amin@test.com",
            "firstName": "Amin",
            "isSeller": true,
            "lastName": "Boulemkahel"
        });
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /users/:id", () => {
    test("The user id shouldn't be found and return not found", async () => {
        const response = await request(app).get('/users/6220e5214aa8c162396fe6fd');
        expect(response.statusCode).toBe(404);
    });
});

describe("GET /users/:id", () => {
    test("The user id should be invalid and return invalid user", async () => {
        const response = await request(app).get('/users/123');
        expect(response.statusCode).toBe(500);
    });
});

describe("POST /users/signup", () => {
    test("It responds with the newly created student with success", async () => {
        const newUser = await request(app).post('/users/signup').send({
            "firstName": "Anis",
            "lastName": "Brachemi",
            "email": "anis@test.com",
            "password": "anisbra12",
            "isSeller": false
        });

        expect(newUser.statusCode).toBe(201);
    });
});

describe("POST /users/signup", () => {
    test("Signup already existing user should respond with a bas request", async () => {
        const newUser = await request(app).post('/users/signup').send({
            "firstName": "Anis",
            "lastName": "Brachemi",
            "email": "anis@test.com",
            "password": "anisbra12",
            "isSeller": false
        });

        expect(newUser.statusCode).toBe(500);
    });
});

describe("POST /users/signup", () => {
    test("Signup with invalid user should respond with an invalid error", async () => {
        const newUser = await request(app).post('/users/signup').send({
            "firstName": "A",
            "lastName": "B",
            "email": "ab@test.com",
            "password": "ab",
            "isSeller": false
        });
        expect(newUser.statusCode).toBe(400);
    });
});

describe("POST /users/login", () => {
    test("It responds with the login success", async () => {
        const user = await request(app).post('/users/login').send({
            "email": "anis@test.com",
            "password": "anisbra12",
        });

        expect(user.statusCode).toBe(200);
    });
});

describe("POST /users/login", () => {
    test("It responds with the login not found", async () => {
        const user = await request(app).post('/users/login').send({
            "email": "kassem@test.com",
            "password": "anisbra12",
        });

        expect(user.statusCode).toBe(404);
    });
});

describe("POST /users/login", () => {
    test("It responds with the login information invalid", async () => {
        const user = await request(app).post('/users/login').send({
            "email": "test.com",
            "password": "anisbra12",
        });

        expect(user.statusCode).toBe(400);
    });
});

describe("PUT /users/:id", () => {
    test("The user id should be found, change information and return success", async () => {
        const newUser = await request(app).post('/users/signup').send({
            "firstName": "Kassem",
            "lastName": "ElZoghbi",
            "email": "kassem@test.com",
            "password": "kassemelzo12",
            "isSeller": true
        });

        const token = newUser.text;
        const decodedId = jwt_decode(token)._id;

        const updatedUser = await request(app).put(`/users/${decodedId}`).set({'x-auth-token': token}).send(
            {
                "firstName": "Updated",
                "lastName": "ElZoghbi",
                "email": "kassem@test.com",
                "password": "kassemelzo12",
                "isSeller": true
            }
        );
        expect(updatedUser.statusCode).toBe(200);
    });
});