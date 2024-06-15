const jwt = require('jsonwebtoken');

//retrieve the JWT Secret Key
const constants = require('../config/constants.json');
const jwtSecret = constants['jwt_secret'];

module.exports = (req, res, next) => {

  const header = req.header('Authorization');

  if (!header) {
    return res.status(401).send({message:'Access denied!'});
  }

  const token = header.replace('Bearer ', '');
  
  try {

    const decodedUser = jwt.verify(token, jwtSecret);
    req.user = decodedUser;
    next();

  } catch(error) {
    return res.status(401).send({message:'Invalid token'});
  }

};
