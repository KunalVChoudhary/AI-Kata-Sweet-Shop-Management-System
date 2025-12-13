const request = require('supertest');
const app = require('../src/app');
const dbSetup = require('./dbSetup');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Sweet = require('../models/sweet')


beforeAll(async () => await dbSetup.setup());
afterAll(async () => await dbSetup.deleteDB());


//test for route POST /api/sweets/:id/purchase: Purchase a sweet, decreasing its quantity. 
describe('POST /api/sweets/:id/purchase', () => {

  beforeEach(async () => {
    await dbSetup.clearCollection();
  });


  test('user can purchase a sweet and quantity decreases by 1', async () => {
    // create user
    const hash = await bcrypt.hash('Pass123', 10);
    await User.create({
      username: 'Kunal',
      email: 'user@example.com',
      password: hash,
      role: 'USER'
    });

    // login user
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'Pass123'
      });

    const token = loginRes.headers['set-cookie'];

    // create sweet
    const sweet = await Sweet.create({
      name: 'Rasgulla',
      price: 10,
      quantity: 2,
      category: 'Indian'
    });

    // purchase sweet should return statuscode 200
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set('Cookie', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.quantity).toBe(1);
  });

  test('cannot purchase sweet if quantity is zero and returns 400', async () => {
    // create user
    const hash = await bcrypt.hash('Pass123', 10);
    await User.create({
      username: 'Kunal',
      email: 'user@example.com',
      password: hash,
      role: 'USER'
    });

    // login user
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'Pass123'
      });

    const token = loginRes.headers['set-cookie'];

    // create sweet with zero quantity
    const sweet = await Sweet.create({
      name: 'Ladoo',
      price: 5,
      quantity: 0,
      category: 'Indian'
    });

    // try purchasing should return statuscode 400
    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/purchase`)
      .set('Cookie', token);

    expect(res.statusCode).toBe(400);
  });

});
