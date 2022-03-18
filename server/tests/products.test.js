const request = require('supertest');
const app = require("../app");
const fs = require('mz/fs');

describe("POST /products", () => {

    test('create a product', async () => {
        const imgPath = `${__dirname}/testFiles/image.jpg`;
        fs.exists(imgPath)
            .then((exists) => {
                if (!exists) throw new Error('file does not exist');
                return request(app)
                    .post('/products/')
                    .set({'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI1NTE0YWM1YjQwYTFmNTk1YTEyYjAiLCJmaXJzdE5hbWUiOiJhbmlzIiwibGFzdE5hbWUiOiJicmFjaGVtaSIsImF2YXRhciI6ImRlZmF1bHQuanBnIiwiaXNTZWxsZXIiOnRydWUsImVtYWlsIjoiYW5pc2JyYWNoZW1pQGhvdG1haWwuY29tIiwiaWF0IjoxNjQ3MjcxMjY2fQ.LUZ1t8ttqOG_4FpHRSDuSw7SPjYKhLWaBq6aRz1OI7E'})
                    .attach('images', imgPath)
                    .field('name', "product 1")
                    .field('description', "product des")
                    .field('category', "1")
                    .field('supply', 12)
                    .field('price', 10)
                    .field('sale', 0)
                    .expect(201)
                    .catch(err => console.log(err));
            })
    })
})
