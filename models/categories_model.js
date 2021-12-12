const { pool } = require('../config')

const categories = {
  get: function (callback) {
    return pool.query('SELECT * FROM categories', callback);
  },
  getByID: function (id, callback) {
    return pool.query('SELECT * FROM categories WHERE idrestaurant = $1', [id], callback);
  },
  add: function (categories, callback) {
    return pool.query(
      'INSERT INTO categories(name, idrestaurant) values($1, $2)',
      [categories.name, categories.idrestaurant],
      callback
    );
  },
  delete: function (id, callback) {
    return pool.query('DELETE FROM categories WHERE idcategories = $1', [id], callback);
  },
  update: function (id, categories, callback) {
    return pool.query(
      'UPDATE categories set name=$1, description=$2, img=$3, price=$4 where idcategories=$5',
      [categories.name, categories.description, categories.img, categories.price, id],
      callback
    );
  }
};

module.exports = categories;