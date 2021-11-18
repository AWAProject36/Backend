const { pool } = require('../config')

const users = {
get: function(callback) {
    return pool.query('SELECT * FROM users', callback);
  },
  getByID: function(id, callback) {
    return pool.query('SELECT * FROM users WHERE idusers = $1', [id], callback);
  },

};
module.exports = users;