const request = require('supertest');
const routes = require('../server/server');
let games = require('../data');

beforeEach(() => {
    games = [{
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }];
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
        it('games array has length of 2', () => {
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
                    expect(r.body.length).toBe(3);
                })
        });
    });
});