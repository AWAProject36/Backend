const { pool } = require('../config')

const register = {
  add: function (user, password, role, callback) {
    console.log("model");
    return pool.query(
      'INSERT INTO users(name, role, address, email, password, phone) values($1, $2, $3, $4, $5, $6)',
      [user.name, role, user.address, user.email, password, user.phone],
      callback
    );
  },

};
module.exports = register;