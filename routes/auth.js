const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//retrieve the JWT Secret Key
const constants = require('../config/constants.json');
const jwtSecret = constants['jwt_secret'];

router.post('/login', (req, res) => {

  const { email, password } = req.body;

  // for the sake of simplicity, let's consider some hard-coded values
  if (email === 'john@example.com' && password === 'john123') {
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

module.exports = router;