const routes = require('express').Router();
const games = require('../data');

routes.get('/', (req, res) => {
    res.status(200).send('working')
});

routes.post('/games', (req, res) => {
    games.push(req.body);
    res.status(201).json(games)
});

module.exports = routes;