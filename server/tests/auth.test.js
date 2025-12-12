const request = require('supertest');
const app = require('../src/app');
const setup = require('./dbSetup');
const User = require('../models/user');
const bcrypt = require('bcrypt');


beforeAll(async () => await setup.setup());
afterAll(async () => await setup.deleteDB());
beforeEach(async () => await setup.clearCollection());


//signup/register route tests
describe('POST /api/auth/register', ()=>{
    //tests for post request on route /api/auth/register to create a user
    test('POST /api/auth/register creates a user and returns 200', async () => {
    const res = await request(app).post('/api/auth/register').send({
        username: 'Kunal',
        email: 'test@example.com',
        password: 'Pass123'
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.role).toBe('USER')
    const u = await User.findOne({ email: 'test@example.com' });
    expect(u).not.toBeNull();
    });

    test('POST /api/auth/register reject a users  request and returns 400', async () => {
    const res = await request(app).post('/api/auth/register').send({
        username: 'Kunal',
        password: 'Pass123'
    });
    expect(res.status).toBe(400);
    });

    test('POST /api/auth/register creates a admin and returns 200', async () => {
    const res = await request(app).post('/api/auth/register').send({
        username: 'Kunal',
        email: 'test@admin.com',
        password: 'Pass123'
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.role).toBe('ADMIN')
    const u = await User.findOne({ email: 'test@admin.com' });
    expect(u).not.toBeNull();
    });
})


//signin/login route tests
describe('POST /api/auth/login', ()=>{


    // create a normal user in DB for login tests
    beforeEach(async () => {
        const hash = await bcrypt.hash('Pass123', 10);
        await User.create({ username: 'Kunal', email: 'test@example.com', password: hash, role: 'USER' });
    });

    //tests for post request on route /api/auth/login to login a user
    test('POST /api/auth/login loggs in a user and returns 200', async () => {
    const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'Pass123'
    });
    
    expect(res.status).toBe(200);
    
    // Check cookie exists
    expect(res.headers["set-cookie"]).toBeDefined();

    // Extract cookie and name check
    const cookie = res.headers["set-cookie"][0];
    expect(cookie.startsWith("token=")).toBe(true);
    });

    test('POST /api/auth/login reject a users request and returns 400', async () => {
    const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
    });
    expect(res.status).toBe(400);
    });
})