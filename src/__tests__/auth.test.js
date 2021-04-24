const request = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/auth';

describe('Sign Up route', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post(`${BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
});
