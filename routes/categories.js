const express = require('express');
const router = express.Router();
const categories = require('../models/categories_model');
const passport = require('passport');
require("../passportConfig")(passport);

router.get('/:id?',
    function (request, response) {
        if (request.params.id) {
            categories.getByID(request.params.id, function (err, dbResult) {
                if (err) {
                    response.json(err);
                } else {
                    response.json(dbResult.rows[0]);
                }
            });
        } else {
            categories.get(function (err, dbResult) {
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
    passport.authenticate('jwt', { session: false }),
    function (request, response) {
        categories.add(request.body, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult);
                response.json(dbResult.rows);
            }
        });
    });


router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    function (request, response) {
        categories.delete(request.params.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult.rows);
            }
        });
    });


router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    function (request, response) {
        categories.update(request.params.id, request.body, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult.rows);
            }
        });
    });

module.exports = router;