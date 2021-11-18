const { pool } = require('../config')

const login = {
get: function(email, callback) {
  return pool.query('SELECT * FROM users WHERE email = $1', [email], callback);
  },

};
module.exports = login;