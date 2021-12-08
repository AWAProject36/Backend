const express = require('express');
const router = express.Router();
const restaurants = require('../models/restaurants_model');

router.get('/:id?',
  function (request, response) {
    if (request.params.id) {
      restaurants.getByID(request.params.id, function (err, dbResult) {
        if (err) {
          response.json(err);
        } else {
          response.json(dbResult.rows[0]);
        }
      });
    } else {
      restaurants.get(function (err, dbResult) {
        if (err) {
          response.json(err);
        } else {
          console.log(dbResult);
          response.json(dbResult.rows);
        }
      });
    }
  });

router.get('/owner/:id',
  function (request, response) {
    restaurants.getByOwner(request.params.id, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult.rows);
      }
    });
  });

router.post('/',
  function (request, response) {
    restaurants.add(request.body, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult);
        response.json(dbResult.rows);
      }
    });
  });


router.delete('/:id',
  function (request, response) {
    restaurants.delete(request.params.id, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult.rows);
      }
    });
  });


router.put('/:id',
  function (request, response) {
    restaurants.update(request.params.id, request.body, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult.rows);
      }
    });
  });

module.exports = router;