const express = require('express');
const bcrypt = require('bcryptjs');

const userDb = require('./userModel.js');
const restricted = require('./restrictedMiddleware.js')

const router = express.Router();

router.get('/', (req, res) => {
    res.status(201).json({message: 'Users route is working!!!'})
});

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    userDb.add(user) 
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    
    userDb.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = userDb.generateToken(user);
                res.status(200).json({
                    message: `${user.username} has successfully logged in`,
                    token
                });
            } else {
                res.status(401).json({message: 'invalid credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.get('/users', restricted, (req, res) => {
    const id = req.user.id
    userDb.findDepartmentById({id})
        .first() 
        .then(users => {
            const department = users.department
            userDb.findByDepartment({department})
                .then(users => {
                    res.status(200).json(users)
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;