const express = require('express');
const router = express.Router();
const login = require('../models/login_model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require("../passportConfig")(passport);

router.post('/',
  passport.authenticate('basic', { session: false }),
  (request, response) => {
    const body = {
      id: request.user.idusers,
      name: request.user.name,
      email: request.user.email,
      role: request.user.role,
      address: request.user.address,
      phone: request.user.phone
    };

    const payload = {
      user: body
    };

    const options = {
      expiresIn: '1d'
    }

    let jwtSecretKey = process.env.JWTKEY;

    const token = jwt.sign(payload, jwtSecretKey, options);

    return response.json({ token });
  });

module.exports = router;