
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if(err) {
        // token expired or is invalid
        res.status(401).json({message: 'You shall not pass'})
      } else {
        // token is good!
        // maybe add the user to the req object
        req.user = {username: decodedToken.username, id: decodedToken.subject};
        next();
      }
    })
  } else {
    res.status(400).json({message: 'no credentials provided'})
  }
};