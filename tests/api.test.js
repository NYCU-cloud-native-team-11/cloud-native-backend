const request = require('supertest');
const app = require('../app');
const db = require('./db');

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

// Test page not found, () => {
describe('GET /notfound', () => {
    it('should return 404', async () => {
        await agent
            .get('/notfound')
            .expect(404);
    });
});

// Test for GET /api/trends
describe('GET /api/trends', () => {
    test('should return 200 status', done => {
        agent
            .get('/api/trends')
            .expect(200, done);
    });
});


// Test for GET /api/trends/keywords/<company>
describe('GET /api/trends/keywords/<company>', () => {
    const company = 'TSMC';
    test('should return 200 status', done => {
        agent
            .get('/api/trends/keywords/' + company)
            .expect(200, done);
    });
});