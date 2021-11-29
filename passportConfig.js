const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const login = require('./models/login_model');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
    let jwtSecretKey = process.env.JWTKEY;

    let options = {}
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = jwtSecretKey;

    passport.use(new JwtStrategy(options, function (jwt_payload, done) {
        console.log(jwt_payload);

        const now = Date.now() / 1000;
        if (jwt_payload.exp > now) {
            done(null, jwt_payload.user);
        }
        else {
            done(null, false);
        }
    }));

    passport.use(new BasicStrategy(
        function (email, password, done) {

            let user;
            login.get(email, function (err, dbResult) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(dbResult.rows[0]);
                    user = dbResult.rows[0];
                    if (user == undefined) {
                        console.log("Username not found");
                        return done(null, false, { message: "Username not found" });
                    }

                    if (bcrypt.compareSync(password, user.password) == false) {
                        console.log("Wrong password");
                        return done(null, false, { message: "Wrong password" });
                    }
                    return done(null, user);
                }
            });
        }
    ));

}
