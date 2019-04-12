const routes = require('express').Router();
const games = require('../data');

routes.get('/', (req, res) => {
    res.status(200).send('working')
});

routes.get('/games', (req, res) => {
    res.status(200).send(games)
});

routes.post('/games', (req, res) => {
    if (!req.body.title || !req.body.genre) {
        return res.status(422).json({ error: 'Title and genre fields are required' })
    };

    const titleIsNotUnique = games.find((game) => game.title === req.body.title);

    if (titleIsNotUnique) {
        res.status(405).json({ error: 'Title already exists in catalog' });
    }

    games.push(req.body);
    return res.status(201).json(games)
});

module.exports = routes;
