const express = require('express');
const router = express.Router();
const login = require('../models/login_model');
const bcrypt = require('bcryptjs');

router.get('/',
 function(req, response) {
   const email = req.body.email;
   const password = req.body.password;

    login.get(email, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult);
        response.json(dbResult.rows);
      }
    });
});

module.exports = router;