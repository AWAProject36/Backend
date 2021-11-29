const express = require('express');
const router = express.Router();
const register = require('../models/register_model');
const bcrypt = require('bcryptjs');


router.post('/',
    function (request, response) {

        const salt = bcrypt.genSaltSync(6);
        const hashedPassword = bcrypt.hashSync(request.body.password, salt);
        const role = "user";
        console.log(hashedPassword);

        register.add(request.body, hashedPassword, role, function (err, dbResult) {
            console.log(dbResult);
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult);
                response.status(201).json({ status: "successful" });
            }
        });
    });

module.exports = router;