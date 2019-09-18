const db = require('../data/dbConfig.js');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const secret = process.env.SECRET;

    const options = {
        expiresIn: '1h',
    }

    return jwt.sign(payload, secret, options)
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users') 
        .insert(user, 'id') 
        .then(ids => {
            const [id] = ids;
            return id;
        })
}


module.exports = {
    findBy,
    generateToken,
    add
}