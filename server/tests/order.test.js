const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose')
const jwt_decode = require('jwt-decode');

afterAll(async () => {
    await mongoose.connection.close()
})

afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let connection of collections) {
        await connection.deleteMany({});
    }
})

describe("GET /orders", () => {
    test("The order return a list of orders and success", async () => {
        const newUser = await request(app).post('/users/signup').send(
            {
                "firstName": "Amin",
                "lastName": "Boulemkahel",
                "email": "amin@test.com",
                "password": "aminbou12",
                "isSeller": true
            }
        );

        const userToken = newUser.text;
        const decodedUserId = jwt_decode(userToken)._id;

        const newProduct = await request(app).post('/products/').set({'x-auth-token': userToken}).send(
            {
                "name": "Apple",
                "description": "a fruit",
                "category": "Fruits",
                "price": 2,
                "supply": 2
            }
        );

        const productId = newProduct.body._id;

        await request(app).post(`/orders/`).set({'x-auth-token': userToken}).send(
            {
                "products": [
                    {
                        "id": productId,
                        "quantity": "1",
                        "seller_id": decodedUserId
                    }
                ],
                "address": {
                    "firstLine": "2000",
                    "city": "Brossard",
                    "province": "Quebec",
                    "country": "Canada",
                    "postal_code": "j2z2j6"
                },
                "total": 100
            }
        );

        const response = await request(app).get(`/orders/?sellerMode=true`).set({'x-auth-token': userToken});
        expect(response.body[0].product.id).toEqual(productId);

        expect(response.body[0].product.quantity).toEqual(1);

        expect(response.body[0].address).toEqual(
            {
                "firstLine": "2000",
                "city": "Brossard",
                "province": "Quebec",
                "country": "Canada",
                "postal_code": "j2z2j6"
            }
        );

        expect(response.body[0].total.$numberDecimal).toEqual("100");

        expect(response.statusCode).toBe(200);
    });
});

describe("GET /order", () => {
    test("The order return success", async () => {
        const newUser = await request(app).post('/users/signup').send(
            {
                "firstName": "Anis",
                "lastName": "Brachemi",
                "email": "anis@test.com",
                "password": "anisbra12",
                "isSeller": true
            }
        );

        const userToken = newUser.text;
        const decodedUserId = jwt_decode(userToken)._id;

        const newProduct = await request(app).post('/products/').set({'x-auth-token': userToken}).send(
            {
                "name": "Banana",
                "description": "a fruit",
                "category": "Fruits",
                "price": 3,
                "supply": 3
            }
        );

        const productId = newProduct.body._id;

        const newOrder = await request(app).post(`/orders/`).set({'x-auth-token': userToken}).send(
            {
                "products": [
                    {
                        "id": productId,
                        "quantity": "4",
                        "seller_id": decodedUserId
                    }
                ],
                "address": {
                    "firstLine": "2000",
                    "city": "Brossard",
                    "province": "Quebec",
                    "country": "Canada",
                    "postal_code": "f2f2f6"
                },
                "total": 111
            }
        );

        // const orderId = newOrder.text.substring(newOrder.text.indexOf("_id") + 6, newOrder.text.length - 11);
        const orderId = JSON.parse(newOrder.text)[0]._id;

        const response = await request(app).get(`/orders/${orderId}`).set({'x-auth-token': userToken});
        expect(response.body.product.id).toEqual(productId);

        expect(response.body.product.quantity).toEqual(4);

        expect(response.body.address).toEqual(
            {
                "firstLine": "2000",
                "city": "Brossard",
                "province": "Quebec",
                "country": "Canada",
                "postal_code": "f2f2f6"
            }
        );

        expect(response.body.total.$numberDecimal).toEqual("111");

        expect(response.statusCode).toBe(200);
    });
});

describe("PUT /orders/complete/:id", () => {
    test("The order return success", async () => {

        const newUser = await request(app).post('/users/signup').send(
            {
                "firstName": "Omari",
                "lastName": "Seleta",
                "email": "omari@test.com",
                "password": "omarisel12",
                "isSeller": true
            }
        );

        const userToken = newUser.text;
        const decodedUserId = jwt_decode(userToken)._id;

        const newProduct = await request(app).post('/products/').set({'x-auth-token': userToken}).send(
            {
                "name": "Foufou",
                "description": "special aliment",
                "category": "Special",
                "price": 3,
                "supply": 3
            }
        );

        const productId = newProduct.body._id;

        const newOrder = await request(app).post(`/orders/`).set({'x-auth-token': userToken}).send(
            {
                "products": [
                    {
                        "id": productId,
                        "quantity": "4",
                        "seller_id": decodedUserId
                    }
                ],
                "address": {
                    "firstLine": "2000",
                    "city": "Brossard",
                    "province": "Quebec",
                    "country": "Canada",
                    "postal_code": "f2f2f6"
                },
                "total": 111
            }
        );

        const orderId = JSON.parse(newOrder.text)[0]._id;

        const response = await request(app).put(`/orders/complete/${orderId}`).set({'x-auth-token': userToken});

        expect(response.statusCode).toBe(200);
    });
});

describe("PUT /orders/cancel/:id", () => {
    test("The order return success", async () => {

        const newUser = await request(app).post('/users/signup').send(
            {
                "firstName": "Kassem",
                "lastName": "ElZoghbi",
                "email": "kassem@test.com",
                "password": "kassemelzo12",
                "isSeller": true
            }
        );

        const userToken = newUser.text;
        const decodedUserId = jwt_decode(userToken)._id;

        const newProduct = await request(app).post('/products/').set({'x-auth-token': userToken}).send(
            {
                "name": "Grapes",
                "description": "a fruit",
                "category": "Fruits",
                "price": 3,
                "supply": 3
            }
        );

        const productId = newProduct.body._id;

        const newOrder = await request(app).post(`/orders/`).set({'x-auth-token': userToken}).send(
            {
                "products": [
                    {
                        "id": productId,
                        "quantity": "4",
                        "seller_id": decodedUserId
                    }
                ],
                "address": {
                    "firstLine": "2000",
                    "city": "Brossard",
                    "province": "Quebec",
                    "country": "Canada",
                    "postal_code": "f2f2f6"
                },
                "total": 111
            }
        );

        const orderId = JSON.parse(newOrder.text)[0]._id;

        const response = await request(app).put(`/orders/complete/${orderId}`).set({'x-auth-token': userToken});

        expect(response.statusCode).toBe(200);
    });
});