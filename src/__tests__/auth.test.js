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
  it('should not create a new user for non-unique paramters', async () => {
    await request(app)
      .post(`${BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    const res = await request(app)
      .post(`${BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body).toHaveProperty('errors');
  });
});


describe('Login route', () => {
    it('should login a user', async () => {
      await request(app)
        .post(`${BASE_URL}/signup`)
        .send({
          fullName: 'Usman Adio',
          userName: 'hadeoh',
          email: 'usmanadio@gmail.com',
          password: 'modupeola',
          confirmPassword: 'modupeola'
        });
  
    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send({
          email: 'usmanadio@gmail.com',
          password: 'modupeola'
        });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('statusCode');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('payload');
      expect(res.body.payload).toHaveProperty('token');
    });

    it('should not login a user', async () => {
    
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send({
                email: 'usmanadio@gmail.com',
                password: 'modupeola'
            });
    
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('statusCode');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('payload');
        expect(res.body.payload).toBeNull();
    });
});

describe('Request Password Reset', () => {
    it('should send a password reset link to user', async () => {
    
        await request(app)
            .post(`${BASE_URL}/signup`)
            .send({
                fullName: 'Usman Adio',
                userName: 'hadeoh',
                email: 'usmanadio@gmail.com',
                password: 'modupeola',
                confirmPassword: 'modupeola'
            });
        
        const resp = await request(app)
            .get(`${BASE_URL}/password-reset/usmanadio@gmail.com`);
        
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toHaveProperty('statusCode');
        expect(resp.body).toHaveProperty('message');
        expect(resp.body).toHaveProperty('payload');
        expect(resp.body.payload).toBeNull();
        expect(resp.body.errors).toBeNull();
        expect(resp.body.message).toBe('A reset password link has been sent to your email');
    });
})

describe('set New Password ', () => {
    it('should set a new password for user', async () => {
    
        await request(app)
            .post(`${BASE_URL}/signup`)
            .send({
                fullName: 'Usman Adio',
                userName: 'hadeoh',
                email: 'usmanadio@gmail.com',
                password: 'modupeola',
                confirmPassword: 'modupeola'
            });
        
        const res = await request(app)
            .post(`${BASE_URL}/login`)
            .send({
              email: 'usmanadio@gmail.com',
              password: 'modupeola'
            });
        
        const resp = await request(app)
            .put(`${BASE_URL}/password-reset/${res.body.payload.user.id}/${res.body.payload.token}`)
            .send({
                password: 'modupeola',
                confirmPassword: 'modupeola'
            })
        
        expect(resp.statusCode).toEqual(202);
        expect(resp.body.statusCode).toEqual(202);
        expect(resp.body).toHaveProperty('statusCode');
        expect(resp.body).toHaveProperty('message');
        expect(resp.body).toHaveProperty('payload');
        expect(resp.body.payload).toBeNull();
        expect(resp.body.errors).toBeNull();
        expect(resp.body.message).toBe('Password successfully changed');
    });
})
