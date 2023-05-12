import request from 'supertest';
import app from './'; // your Express app

describe('POST /auth/login', () => {
  it('responds with a JSON object containing a token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@mail.com', password: 'test' })
      .set('Accept', 'application/json');
      
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});

describe('POST /auth/register', () => {
    it('responds with a JSON object containing a token', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ username: 'test', email: 'test@mail.com', password: 'test' })
        .set('Accept', 'application/json');
        
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });