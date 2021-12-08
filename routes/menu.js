const express = require('express');
const router = express.Router();
const menu = require('../models/menu_model');
const passport = require('passport');
require("../passportConfig")(passport);

router.get('/:id?',
    function (request, response) {
        if (request.params.id) {
            menu.getByID(request.params.id, function (err, dbResult) {
                if (err) {
                    response.json(err);
                } else {
                    let menu = [];
                    let i = 0;
                    while (dbResult.rows[i]) {
                        if (menu.filter(e => e.category == dbResult.rows[i].category).length > 0) {
                            let index = menu.findIndex((e => e.category == dbResult.rows[i].category));
                            let productsTemp = {
                                name: dbResult.rows[i].product,
                                price: dbResult.rows[i].price,
                                description: dbResult.rows[i].description,
                                img: dbResult.rows[i].img
                            }
                            menu[index].products.push(productsTemp);
                        }
                        else {
                            let productsTemp = [{
                                name: dbResult.rows[i].product,
                                price: dbResult.rows[i].price,
                                description: dbResult.rows[i].description,
                                img: dbResult.rows[i].img
                            }]
                            menu.push({
                                category: dbResult.rows[i].category,
                                products: productsTemp
                            })
                        }
                        i++;
                    }
                    response.json(menu);
                }
            });
        } else {
            menu.get(function (err, dbResult) {
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
        menu.add(request.body, function (err, dbResult) {
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
        menu.delete(request.params.id, function (err, dbResult) {
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
        menu.update(request.params.id, request.body, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult.rows);
            }
        });
    });

module.exports = router;