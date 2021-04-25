  
const request = require('supertest');
const app = require('../app');

const AUTH_BASE_URL = '/api/v1/auth';
const POST_BASE_URL = '/api/v1/posts';

describe('Posts route', () => {
  let userToken;
  it('should publish a new post', async () => {
    await request(app)
      .post(`${AUTH_BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    const user = await request(app)
      .post(`${AUTH_BASE_URL}/login`)
      .send({
        email: 'usmanadio@gmail.com',
        password: 'modupeola'
      });

    userToken = user.body.payload.token;

    const res = await request(app).post(`${POST_BASE_URL}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'I am here'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.errors).toBeNull();
  });

  it('should fetch a post', async () => {
    
    const post = await request(app).post(`${POST_BASE_URL}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'I am here'
      });

    const res = await request(app)
      .get(`${POST_BASE_URL}/${post.body.payload.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.errors).toBeNull();
  });

  it('should delete a post', async () => {
    
    const post = await request(app).post(`${POST_BASE_URL}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'I am here'
      });

    const res = await request(app)
      .delete(`${POST_BASE_URL}/${post.body.payload.id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.errors).toBeNull();
  });

  it('should edit a post', async () => {
    
    const post = await request(app).post(`${POST_BASE_URL}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'I am here'
      });

    const res = await request(app)
      .put(`${POST_BASE_URL}/${post.body.payload.id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'I left there'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.errors).toBeNull();
  });

  it('should authorise a user', async () => {
    await request(app)
      .post(`${AUTH_BASE_URL}/signup`)
      .send({
        fullName: 'Usman Adio',
        userName: 'hadeoh',
        email: 'usmanadio@gmail.com',
        password: 'modupeola',
        confirmPassword: 'modupeola'
      });
    const user = await request(app)
      .post(`${AUTH_BASE_URL}/login`)
      .send({
        email: 'usmanadio@gmail.com',
        password: 'modupeola'
      });

    userToken = user.body.payload.token;

    const res = await request(app).post(`${POST_BASE_URL}`)
      .send({
        content: 'I am here'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('statusCode');
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('payload');
    expect(res.body.errors).toHaveProperty('error');
    expect(res.body.errors.error).toBe('No Authorization found');
    expect(res.body.message).toBe('No Token found');
  });
});