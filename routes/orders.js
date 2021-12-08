const express = require('express');
const router = express.Router();
const orders = require('../models/orders_model');
const passport = require('passport');
require("../passportConfig")(passport);

router.get('/',
    passport.authenticate('jwt', { session: false }),
    function (request, response) {
        orders.getByUserID(request.user.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                let orders = [];
                let i = 0;
                while (dbResult.rows[i]) {
                    if (orders.filter(e => e.id == dbResult.rows[i].idorders).length > 0) {
                        let index = orders.findIndex((e => e.id == dbResult.rows[i].idorders));
                        orders[index].products.push(dbResult.rows[i].product);
                        orders[index].sum += parseFloat(dbResult.rows[i].price);
                    }
                    else {
                        orders.push({
                            id: dbResult.rows[i].idorders,
                            name: request.user.name,
                            restaurant: dbResult.rows[i].restaurant,
                            state: dbResult.rows[i].state,
                            date: dbResult.rows[i].order_date,
                            sum: parseFloat(dbResult.rows[i].price),
                            products: [dbResult.rows[i].product]
                        })
                    }
                    i++;
                }
                response.json(orders);
            }
        });
    });

router.get('/:id?',
    passport.authenticate('jwt', { session: false }),
    function (request, response) {
        console.log("getbyID!")
        orders.getByRestaurant(request.params.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                let orders = [];
                let i = 0;
                let user;
                while (dbResult.rows[i]) {
                    if (orders.filter(e => e.id == dbResult.rows[i].idorders).length > 0) {
                        let index = orders.findIndex((e => e.id == dbResult.rows[i].idorders));
                        orders[index].products.push(dbResult.rows[i].product);
                        orders[index].sum += parseFloat(dbResult.rows[i].price);
                    }
                    else {
                        orders.push({
                            id: dbResult.rows[i].idorders,
                            name: dbResult.rows[i].customer,
                            address: dbResult.rows[i].address,
                            phone: dbResult.rows[i].phone,
                            restaurant: dbResult.rows[i].restaurant,
                            state: dbResult.rows[i].state,
                            date: dbResult.rows[i].order_date,
                            sum: parseFloat(dbResult.rows[i].price),
                            products: [dbResult.rows[i].product]
                        })
                    }
                    i++;
                }
                response.json(orders);
            }
        });


    });

router.post('/',
    passport.authenticate('jwt', { session: false }),
    function (request, response) {
        orders.addOrder(request.body, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                let idorders = dbResult.rows[0].idorders;
                request.body.products.forEach(product => {
                    orders.addOrderProducts(idorders, product, function (err, dbResult) {
                        if (err) {
                            console.log(err);
                        }
                    })
                });
                response.json(dbResult.rows);
            }
        });
    });


router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    function (request, response) {
        orders.delete(request.params.id, function (err, dbResult) {
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
        orders.update(request.params.id, request.body, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult.rows);
            }
        });
    });

module.exports = router;