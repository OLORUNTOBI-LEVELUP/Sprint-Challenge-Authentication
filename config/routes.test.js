const request = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(() => {
    return db('users').truncate();
});

describe('Authenitication endpoint tests', () => {
    
    it('Can login', async (done) => {
        let agent = request(server);
        agent.post('/api/register')
            .send({
                username: "oloruntobi",
                password: "florence"
            })
            .end(() => {
                agent.post('/api/login')
                    .send({
                        username: "oloruntobi",
                        password: "florence"
                    })
                    .expect(200)
                    .then(res => {
                        expect(res.body.token).toBeDefined();
                        done();
                    })
            })
})
})