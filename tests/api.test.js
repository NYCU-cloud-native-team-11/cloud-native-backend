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


// Test for POST /api/trends
describe('POST /api/trends', () => {
    const payload = {
        company: 'TSMC',
        count: 10,
        date: '2022-05-20',
    };
    test('should store a new trend', (done) => {
        agent
            .post('/api/trends')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
    test('should return 400 status', (done) => {
        agent
            .post('/api/trends')
            .send({ company: 'TSMC' })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
    test('should return 400 status', (done) => {
        agent
            .post('/api/trends')
            .send({ company: 'TSMC', count: 10 })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});