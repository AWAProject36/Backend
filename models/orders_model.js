const { pool } = require('../config')

const orders = {
  get: function (callback) {
    return pool.query('SELECT * FROM orders', callback);
  },
  getByUserID: function (id, callback) {
    return pool.query('SELECT orders.idorders, restaurants.name as restaurant, orders.state, products.name as product, products.price, orders.order_date FROM orders INNER JOIN orders_products ON orders.idorders = orders_products.idorders INNER JOIN products ON products.idproducts = orders_products.idproducts INNER JOIN restaurants ON restaurants.idrestaurant = orders.idrestaurant WHERE orders.idusers = $1;', [id], callback);
  },
  getByRestaurant: function (id, callback) {
    return pool.query('SELECT users.name as customer, users.phone, users.address, orders.idusers, orders.idorders, restaurants.name as restaurant, orders.state, products.name as product, products.price, orders.order_date FROM orders INNER JOIN orders_products ON orders.idorders = orders_products.idorders INNER JOIN products ON products.idproducts = orders_products.idproducts INNER JOIN restaurants ON restaurants.idrestaurant = orders.idrestaurant INNER JOIN users ON users.idusers = orders.idusers WHERE orders.idrestaurant = $1;', [id], callback);
  },
  addOrder: function (orders, callback) {
    return pool.query(
      'INSERT INTO orders(state, idusers, idrestaurant) values($1, $2, $3) RETURNING idorders',
      [orders.state, orders.idusers, orders.idrestaurant],
      callback
    );
  },
  addOrderProducts: function (idorders, idproducts, callback) {
    return pool.query(
      'INSERT INTO orders_products(idorders, idproducts) values($1, $2)',
      [idorders, idproducts],
      callback
    );
  },
  delete: function (id, callback) {
    return pool.query('DELETE FROM orders WHERE idorders = $1', [id], callback);
  },
  update: function (id, orders, callback) {
    return pool.query(
      'UPDATE orders set state=$1 where idorders=$2',
      [orders.state, id],
      callback
    );
  }
};

module.exports = orders;