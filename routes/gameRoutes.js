const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('working')
});

module.exports = routes;