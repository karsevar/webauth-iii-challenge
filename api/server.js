const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/', (req, res) => {
    res.send('<h2>base root is displaying something</h2>')
});

module.exports = server;