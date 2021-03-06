const express = require('express');
const router = express.Router();
const products = require('../models/products_model');
const menu = require('../models/menu_model');

router.get('/:id?',
  function (request, response) {
    if (request.params.id) {
      products.getByID(request.params.id, function (err, dbResult) {
        if (err) {
          response.json(err);
        } else {
          response.json(dbResult.rows[0]);
        }
      });
    } else {
      products.get(function (err, dbResult) {
        if (err) {
          response.json(err);
        } else {
          console.log(dbResult);
          response.json(dbResult.rows);
        }
      });
    }
  });

router.post('/',
  function (request, response) {
    products.add(request.body, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        menu.add(request.body, dbResult.rows[0].idproducts, function (err, menuResult) {
          if (err) {
              response.json(err);
          } else {
              response.json(menuResult.rows);
          }
      });
      }
    });
  });


router.delete('/:id',
  function (request, response) {
    products.deleteFromMenu(request.params.id, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        products.delete(request.params.id, function (err, dbResult) {
          if (err) {
            response.json(err);
          } else {
            response.json(dbResult.rows);
          }
      });
    }
  });
  });

router.put('/:id',
  function (request, response) {
    products.update(request.params.id, request.body, function (err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        response.json(dbResult.rows);
      }
    });
  });
  
module.exports = router;