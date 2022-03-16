const request = require('supertest');
const app = require("../app");

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

test('place order', async () => {
    await request(app).post('/orders/signup')
        .set({'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjI1NTE0YWM1YjQwYTFmNTk1YTEyYjAiLCJmaXJzdE5hbWUiOiJhbmlzIiwibGFzdE5hbWUiOiJicmFjaGVtaSIsImF2YXRhciI6ImRlZmF1bHQuanBnIiwiaXNTZWxsZXIiOnRydWUsImVtYWlsIjoiYW5pc2JyYWNoZW1pQGhvdG1haWwuY29tIiwiaWF0IjoxNjQ3MjcxMjY2fQ.LUZ1t8ttqOG_4FpHRSDuSw7SPjYKhLWaBq6aRz1OI7E'})
        .send({
            products: [{id:'622f6af89dd4efbbcfed436e', quantity:1, seller_id: '6225514ac5b40a1f595a12b0'}],
            address: {
                firstLine: '1234 buy street',
                city: 'some City',
                province: 'QC',
                country: 'usa',
                postal_code: '24424'
            },
            total: 50
        }).expect(200);
})
