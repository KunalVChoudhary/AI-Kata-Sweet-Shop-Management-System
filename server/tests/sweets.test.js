const request = require('supertest');
const app = require('../src/app');
const dbSetup = require('./dbSetup');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Sweet = require('../models/sweet')


beforeAll(async () => await dbSetup.setup());
afterAll(async () => await dbSetup.deleteDB());


//test for route POST /api/sweets for Adding a new sweet
describe('POST /api/sweets for Adding a new sweet', ()=>{

    beforeEach(async () => await dbSetup.clearCollection());

    test('create a new sweet in db on request of admin and return status 200',async()=>{

        // create a admin in DB for login 
        const hash = await bcrypt.hash('Pass123', 10);
        await User.create({ username: 'Kunal', email: 'test@admin.com', password: hash, role: 'ADMIN' });

        //login admin for accessing protected route
        const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
            email: "test@admin.com",
            password: "Pass123"
        });
        const token = loginRes.headers["set-cookie"];

        //send request to create a new sweet
        const createSweetRes = await request(app)
        .post("/api/sweets")
        .set("Cookie", token)
        .send({
            name: "Rasgulla",
            price: 10,
            quantity: 50
        });

        expect(createSweetRes.statusCode).toBe(200)
        
    })

    test('reject users request to create a new sweet because its protected route and return status 400',async()=>{


        // create a user in DB for login 
        const hash = await bcrypt.hash('Pass123', 10);
        await User.create({ username: 'Kunal', email: 'test@example.com', password: hash, role: 'USER' });

        //login admin for accessing protected route
        const loginRes = await request(app)
        .post("/api/auth/login")
        .send({
            email: "test@example.com",
            password: "Pass123"
        });
        const token = loginRes.headers["set-cookie"];

        //send request to create a new sweet
        const createSweetRes = await request(app)
        .post("/api/sweets")
        .set("Cookie", token)
        .send({
            name: "Rasgulla",
            price: 10,
            quantity: 50
        });

        expect(createSweetRes.statusCode).toBe(400)

    })
})


// test for route GET /api/sweets: View a list of all available sweets
describe('GET /api/sweets for Viewing a list of all available sweets',()=>{

    test('send a list/array of sweets to the user on request and return statuscode 200', async()=>{

        const getSweetsListRes = await request(app)
        .get("/api/sweets");

        expect(getSweetsListRes.statusCode).toBe(200)
        expect(Array.isArray(getSweetsListRes.body)).toBe(true);

    })

})