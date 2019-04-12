const request = require('supertest');
const routes = require('../server/server');
let { games } = require('../data');

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
                .then((response) => {
                    expect(response.body.length).toBe(1);
                    expect(response.body[0].id).toBe(2);
                })
        });

        it('returns a status code of 405 if title is not unique', () => {
            games.push({
                id: 1,
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
                .then((response) => {
                    expect(response.body).toEqual({ error: 'Title already exists in catalog' });
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
                id: 1,
                title: 'Pacman', 
                genre: 'Arcade', 
                releaseYear: 1980 
            },
            {
                id: 2,
                title: 'Pong',
                genre: 'Arcade',
                releaseYear: 1972
            });

            return request(routes)
                .get('/games')
                .then(response => {
                    expect(response.body.length).toBe(2)
                });
        });
    });

    describe('GET /games/:id', () => {
        it('returns a 404 status if game is not found', () => {
            games.push({
                id: 1,
                title: 'Pacman', 
                genre: 'Arcade',
                releaseYear: 1980
            });
            return request(routes)
                .get('/games/2')
                .expect(404)
                .expect({ error: 'Game with id 2 not found' });
        });

        it('returns a status code 200 when a game is found', () => {
            games.push({
                id: 1,
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980 
            });
            return request(routes)
                .get('/games/1')
                .expect(200);
        });

        it('returns a single game object when a game is found', () => {
            games.push({
                id: 1,
                title: 'Pacman', 
                genre: 'Arcade', 
                releaseYear: 1980
            });
            return request(routes)
                .get('/games/1')
                .then(response => {
                    expect(response.body.id).toBe(1);
                    expect(response.body.title).toBe('Pacman');
                });
        });
    });

    describe('DELETE /games/:id', () => {
        it('returns 404 if game not found', () => {
            games.push({
                id: 1,
                title: 'Pacman', 
                genre: 'Arcade',
                releaseYear: 1980
            });

            return request(routes)
                .delete('/games/2')
                .expect(404)
                .expect({ error: 'Game with id 2 not found' });
        });

        it('returns 201 status, and empty array if game deleted', () => {
            games.push({
                id: 1,
                title: 'Pacman', 
                genre: 'Arcade',
                releaseYear: 1980
            });

            return request(routes)
                .delete('/games/1')
                .expect(201)
                .expect([]);
        });
    });
});