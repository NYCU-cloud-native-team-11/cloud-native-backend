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

// Test for GET /
describe('GET /', () => {
    test('should return 200 status', done => {
        agent
            .get('/')
            .expect(200, done);
    });
});


// Test for GET /keywords/<company>
describe('GET /keywords/<company>', () => {
    const company = 'TSMC';
    test('should return 200 status', done => {
        agent
            .get('/keywords/' + company)
            .expect(200, done);
    });
});

// Test for GET /keywords/<company>/last_24_hours
describe('GET /keywords/<company>/last_24_hours', () => {
    const company_TSMC = 'TSMC';
    test('should return 200 status', done => {
        agent
            .get('/keywords/' + company_TSMC + '/last_24_hours')
            .expect(200, done);
    });
    test("should return a empty array", done => {
        agent
            .get('/keywords/' + company_TSMC + '/last_24_hours')
            .expect(200, [])
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

// Test for GET /keywords/<company>/last_7_days
describe('GET /keywords/<company>/last_7_days', () => {
    const company_TSMC = 'TSMC';
    test('should return 200 status', done => {
        agent
            .get('/keywords/' + company_TSMC + '/last_7_days')
            .expect(200, done);
    });
    test("should return a empty array", done => {
        agent
            .get('/keywords/' + company_TSMC + '/last_7_days')
            .expect(200, [])
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

// Test for GET /keywords/<company>/last_30_days
describe('GET /keywords/<company>/last_30_days', () => {
    const company_TSMC = 'TSMC';
    test('should return 200 status', done => {
        agent
            .get('/keywords/' + company_TSMC + '/last_30_days')
            .expect(200, done);
    });
    test("should return a empty array", done => {
        agent
            .get('/keywords/' + company_TSMC + '/last_30_days')
            .expect(200, [])
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});

// Test for GET /keywords/<company>/<specify date>-<specify date>
describe('GET /keywords/<company>/20220602-20220603', () => {
    const company_TSMC = 'TSMC';
    test('should return 200 status', done => {
        agent
            .get('/keywords/' + company_TSMC + '/20220602-20220603')
            .expect(200, done);
    });
    test("should return a empty array", done => {
        agent
            .get('/keywords/' + company_TSMC + '/20220602-20220603')
            .expect(200, [])
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
});


// Test for POST /
describe('POST /', () => {
    const payload = {
        company: 'TSMC',
        count: 10,
        date: '2022-05-20 00:00:00',
    };
    test('should store a new trend', (done) => {
        agent
            .post('/')
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
            .post('/')
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
            .post('/')
            .send({ company: 'TSMC', count: 10 })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});


describe('POST and GET', () => {
    const payload = {
        company: 'TSMC',
        count: 10,
        date: '2022-05-20 00:00:00',
    };
    test('should store a new trend and get payload data', (done) => {
        agent
            .post('/')
            .send(payload)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
            });
        agent
            .get('/')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(1);
                expect(res.body[0].company).toBe(payload.company);
                expect(res.body[0].count).toBe(payload.count);
                expect(Date(res.body[0].date)).toBe(Date(payload.date));
            })
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});


// Test for POST /post_many
describe('POST /post_many', () => {
    const payload = [
        {
            company: 'TSMC',
            count: 15,
            date: '2022-05-26 00:00:00',
        },
        {
            company: 'ASML',
            count: 5,
            date: '2022-05-02 00:00:00',
        },
    ];
    test('should store multiple new trend', (done) => {
        agent
            .post('/post_many')
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
            .post('/post_many')
            .send([
                {
                    company: 'TSMC',
                    count: 15,
                },
                {
                    company: 'ASML',
                    count: 5,
                    date: '2022-05-02',
                },
            ])
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
    test('should return 400 status', (done) => {
        agent
            .post('/post_many')
            .send([
                {
                    company: 'TSMC',
                    count: 15,
                    date: '2022-05-26',
                },
                {
                    company: 'ASML',
                    date: '2022-05-02',
                },
            ])
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
    test('should return 400 status', (done) => {
        agent
            .post('/post_many')
            .send([
                {
                    company: 15,
                    count: 15,
                    date: '2022-05-26',
                },
                {
                    company: 'ASML',
                    date: '2022-05-02',
                },
            ])
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});
