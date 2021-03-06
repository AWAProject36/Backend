const { pool } = require('../config')

const products = {
  get: function (callback) {
    return pool.query('SELECT * FROM products', callback);
  },
  getByID: function (id, callback) {
    return pool.query('SELECT * FROM products WHERE idProducts = $1', [id], callback);
  },
  add: function (products, callback) {
    return pool.query(
      'INSERT INTO products(name, description, price, img, idCategories) values($1, $2, $3, $4, $5) RETURNING idproducts',
      [products.name, products.description, products.price, products.img, products.idcategories],
      callback
    );
  },
  delete: function (id, callback) {
    return pool.query('DELETE FROM products WHERE idProducts = $1', [id], callback);
  },
  deleteFromMenu: function (id, callback) {
    return pool.query('DELETE FROM menu WHERE idProducts = $1', [id], callback);
  },
  update: function (id, products, callback) {
    return pool.query(
      'UPDATE products set name=$1, description=$2, img=$3, price=$4 where idProducts=$5',
      [products.name, products.description, products.img, products.price, id],
      callback
    );
  }
};

module.exports = products;