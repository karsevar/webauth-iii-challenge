const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(201).json({message: 'Users route is working!!!'})
});

module.exports = router;