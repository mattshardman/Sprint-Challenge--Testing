const request = require('supertest');
const routes = require('../server/server');
let games = require('../data');

beforeEach(() => {
    games = [];
});

describe('test endpoint', () => {
    it('returns a status code of 200', () => {
        return request(routes)
            .get('/')
            .expect(200);
    });
});

describe('test endpoints', () => {
    describe('POST /games endpoint', () => {
        it('returns a status code 422 if title field is missing', () => {
            return request(routes)
                .post('/games')
                .send({
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                })
                .expect(422)
        });

        it('returns a status code 422 if genre field is missing', () => {
            return request(routes)
                .post('/games')
                .send({
                    name: 'Pacman',
                    releaseYear: 1980 // not required
                })
                .expect(422)
        });

        it('returns a 201 status when new game is correctly created', () => {
            return request(routes)
                .post('/games')
                .send({
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                })
                .expect(201)
        });

        it('games array has length of 2', () => {
            return request(routes)
                .post('/games')
                .send({
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                })
                .expect(201)
                .then((r) => {
                    expect(r.body.length).toBe(2);
                })
        });
    });

    describe('GET /games endpoint', () => {
        it('returns status 200', () => {
            return request(routes)
                .get('/games')
                .expect(200);
        })
    });
});