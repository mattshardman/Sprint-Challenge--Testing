const server = require('./server/server');

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => `listening on ${PORT}`);