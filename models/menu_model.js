const { pool } = require('../config')

const menu = {
  get: function (callback) {
    return pool.query('SELECT * FROM menu', callback);
  },
  getByID: function (id, callback) {
    return pool.query('SELECT categories.name as category, products.name as product, products.price, products.description, products.img FROM products INNER JOIN menu ON menu.idproducts = products.idproducts INNER JOIN categories ON categories.idcategories = products.idcategories WHERE menu.idrestaurant = $1;', [id], callback);
  },
  add: function (menu, callback) {
    return pool.query(
      'INSERT INTO menu values($1, $2)',
      [menu.idrestaurants, menu.idproducts],
      callback
    );
  },
  delete: function (id, callback) {
    return pool.query('DELETE FROM menu WHERE idmenu = $1', [id], callback);
  },
  update: function (id, menu, callback) {
    return pool.query(
      'UPDATE menu set name=$1, description=$2, img=$3, price=$4 where idmenu=$5',
      [menu.name, menu.description, menu.img, menu.price, id],
      callback
    );
  }
};

module.exports = menu;