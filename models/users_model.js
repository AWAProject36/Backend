const { pool } = require('../config')

const users = {
get: function(callback) {
    return pool.query('SELECT * FROM users', callback);
  },
  getByID: function(id, callback) {
    return pool.query('SELECT * FROM users WHERE idusers = $1', [id], callback);
  },
  updateRole: function (id, user, callback) {
    return pool.query(
      'UPDATE users set role=$1 where idusers=$2',
      [user.role, id],
      callback
    );
  }

};
module.exports = users;