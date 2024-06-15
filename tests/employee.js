const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

//retrieve the JWT Secret Key
const constants = require('../config/constants.json');
const jwtSecret = constants['jwt_secret'];

describe('GET /employee/:id', () => {
  it('should return employee hierarchy', async () => {
    const token = jwt.sign({ email: 'john@example.com', password: 'john123' }, jwtSecret);

    const res = await request(app)
      .get('/employee/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app)
      .get('/employee/1');

    expect(res.statusCode).toEqual(401);
  });

  it('should return 401 if token is invalid', async () => {
    const res = await request(app)
      .get('/employee/1')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toEqual(401);
  });
});
