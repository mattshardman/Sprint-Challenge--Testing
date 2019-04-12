const request = require('supertest');
const routes = require('../server/server');
const { games } = require('../data');

beforeEach(() => {
    games.length = 0;
})

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
                    genre: 'Arcade',
                    releaseYear: 1980 
                })
                .expect(422)
        });

        it('returns a status code 422 if genre field is missing', () => {
            return request(routes)
                .post('/games')
                .send({
                    name: 'Pacman',
                    releaseYear: 1980
                })
                .expect(422)
        });

        it('returns a 201 status when new game is correctly created', () => {
            return request(routes)
                .post('/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade', 
                    releaseYear: 1980
                })
                .expect(201)
        });

        it('games array has length of 1 after posting', () => {
            return request(routes)
                .post('/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                })
                .expect(201)
                .then((r) => {
                    expect(r.body.length).toBe(1);
                    expect(r.body[0].id).toBe(2);
                })
        });

        it('returns a status code of 405 if title is not unique', () => {
            games.push({
                title: 'Pacman', 
                genre: 'Arcade',
                releaseYear: 1980
            });

            return request(routes)
                .post('/games')
                .send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                })
                .expect(405)
                .then((r) => {
                    expect(r.body).toEqual({ error: 'Title already exists in catalog' });
                })
        });
    });

    describe('GET /games endpoint', () => {
        it('returns status 200', () => {
            return request(routes)
                .get('/games')
                .expect(200);
        })

        it('returns an empty array if no games are present', () => {
            return request(routes)
                .get('/games')
                .expect([]);
        });

        it('returns an array of games', () => {
            games.push({
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                title: 'Pong', // required
                genre: 'Arcade', // required
                releaseYear: 1972 // not required
            });

            return request(routes)
                .get('/games')
                .then(r => {
                    expect(r.body.length).toBe(2)
                });
        });
    });
});