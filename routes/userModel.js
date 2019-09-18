const db = require('../data/dbConfig.js');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const secret = process.env.SECRET;

    const options = {
        expires: '1d',
    }

    return jwt.sign(payload, secret, options)
}

function findBy(filter) {
    return db('users').where(filter);
}

module.exports = {
    findBy,
    generateToken
}