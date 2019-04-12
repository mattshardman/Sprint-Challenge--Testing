const routes = require('express').Router();
const { games } = require('../data');

let id = 1;

routes.get('/', (req, res) => {
    res.status(200).send('working')
});

routes.get('/games', (req, res) => {
    res.status(200).send(games)
});

routes.get('/games/:id', (req, res) => {
    const { id } = req.params;
    const singleGame = games.find((game) => game.id == id);

    if (!singleGame) return res.status(404).json({ error: `Game with id ${id} not found` });

    res.status(200).json(singleGame);
});

routes.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;

    if (!title || !genre) return res.status(422).json({ error: 'Title and genre fields are required' });

    const titleIsNotUnique = games.find((game) => game.title === req.body.title);

    if (titleIsNotUnique) return res.status(405).json({ error: 'Title already exists in catalog' });

    games.push({
        id,
        title,
        genre, 
        releaseYear
    });

    id++;

    return res.status(201).json(games)
});

routes.delete('/games/:id', () => {
    const { id } = req.params;
    const newGamesArr = games.find((game) => game.id != id);
    games = newGamesArr;
});

module.exports = routes;
