const db = require('../data/dbConfig.js');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
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

function findAll() {
    return db('users').select('username', 'department');
}

function findByDepartment(department) {
    return db('users').where(department).select('username', 'department');
}

function add(user) {
    return db('users') 
        .insert(user, 'id') 
        .then(ids => {
            const [id] = ids;
            return id;
        })
}

function findDepartmentById(id) {
    return db('users').where(id).select('department');
}


module.exports = {
    findBy,
    generateToken,
    add,
    findAll,
    findByDepartment,
    findDepartmentById
}