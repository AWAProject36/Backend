const express = require('express');
const router = express.Router();
const users = require('../models/users_model');

router.get('/:id?',
 function(request, response) {
  if (request.params.id) {
    users.getByID(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult.rows[0]);
      }
    });
  } else {
    users.get(function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult);
        response.json(dbResult.rows);
      }
    });
  }
});

module.exports = router;