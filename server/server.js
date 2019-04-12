const server = require('express')();
const gameRoutes = require('../routes/gameRoutes');

server.use(express.json());

server.use(gameRoutes);

module.exports = server;
