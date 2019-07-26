const request = require('supertest');

const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(() => {
    return db('users').truncate();
});

describe('Authenitication endpoint tests', () => {
    it("Doesn't register on empty fields", async () => {
        return request(server)
            .post('/api/register')
            .send({
                username: "oloruntobi",
                password: ""
            })
            .expect(400)
            .then(async (res) => {
                expect(res.body).toEqual({ error: "Username and password needs to be provided" });
            })
    });

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