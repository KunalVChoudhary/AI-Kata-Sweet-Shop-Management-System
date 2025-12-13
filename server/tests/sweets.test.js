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


//test for GET /api/sweets/search: Search for sweets by name, category, or price range
describe('GET /api/sweets/search', () => {

  test('search sweets by name and return status 200', async () => {
    const res = await request(app)
      .get('/api/sweets/search')
      .query({ name: 'ras' });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('search sweets by category and return status 200', async () => {
    const res = await request(app)
      .get('/api/sweets/search')
      .query({ category: 'Indian' });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('search sweets by price range and return status 200', async () => {
    const res = await request(app)
      .get('/api/sweets/search')
      .query({ minPrice: 10, maxPrice: 20 });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('search sweets with multiple filters and return status 200', async () => {
    const res = await request(app)
      .get('/api/sweets/search')
      .query({
        name: 'la',
        category: 'Indian',
        maxPrice: 15
      });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});


//test for PUT /api/sweets/:id: Update a sweet's details
describe('PUT /api/sweets/:id for updating sweet details', () => {

  beforeEach(async () => {
    await dbSetup.clearCollection();
  });

  test('admin can update sweet details and gets status 200', async () => {
    // create admin
    const hash = await bcrypt.hash('Pass123', 10);
    await User.create({
      username: 'Admin',
      email: 'admin@test.com',
      password: hash,
      role: 'ADMIN'
    });

    // login admin
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'Pass123'
      });

    const cookie = loginRes.headers['set-cookie'];

    // create a sweet directly in DB
    const sweet = await Sweet.create({
      name: 'Ladoo',
      price: 5,
      quantity: 20,
      category: 'Indian'
    });

    // update sweet
    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set('Cookie', cookie)
      .send({
        price: 10,
        quantity: 30
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(10);
    expect(res.body.quantity).toBe(30);
  });

  test('normal user cannot update sweet and gets status 400', async () => {
    // create normal user
    const hash = await bcrypt.hash('Pass123', 10);
    await User.create({
      username: 'KUnal',
      email: 'email@example.com',
      password: hash,
      role: 'USER'
    });

    // login user
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'email@example.com',
        password: 'Pass123'
      });

    const cookie = loginRes.headers['set-cookie'];

    // create sweet
    const sweet = await Sweet.create({
      name: 'Barfi',
      price: 15,
      quantity: 25,
      category: 'Indian'
    });

    // try updating sweet
    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set('Cookie', cookie)
      .send({
        price: 20
      });

    expect(res.statusCode).toBe(400);
  });

});