const request = require('supertest');
const routes = require('../server/server');
const games = require('../data');

describe('test endpoint', () => {
    it('returns a status code of 200', () => {
        return request(routes)
            .get('/')
            .expect(200);
    });
});

describe('test endpoints', () => {
    describe('POST /games endpoint', () => {
        it('returns a status code 201', () => {
            return request(routes)
                .post('/games')
                .expect(201);
        });

        it('games array has length of 3', () => {
            return request(routes)
                .post('/games')
                .send({
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                })
                .then((r) => {
                    expect(games.length).toBe(1);
                    expect(r.length).toBe(1);
                })
        });
    });
});