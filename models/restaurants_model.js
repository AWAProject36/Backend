const { pool } = require('../config')

const restaurants = {
get: function(callback) {
    return pool.query('SELECT * FROM restaurants', callback);
  },
getByID: function(id, callback) {
    return pool.query('SELECT * FROM restaurants WHERE idRestaurant = $1', [id], callback);
  },
  add: function(restaurant, callback) {
    return pool.query(
      'INSERT INTO restaurants(name, address, opening, closing, img, type, pricelvl, owneruserid) values($1, $2, $3, $4, $5, $6, $7, $8)',
      [restaurant.name, restaurant.address, restaurant.opening, restaurant.closing, restaurant.img, restaurant.type, restaurant.pricelvl, restaurant.owneruserid],
      callback
    );
  },
  delete: function(id, callback) {
    return pool.query('DELETE FROM restaurants WHERE idRestaurant = $1', [id], callback);
  },
  update: function(id, restaurant, callback) {
    return pool.query(
      'UPDATE restaurants set name=$1, address=$2, opening=$3, closing=$4, img=$5, type=$6, pricelvl=$7, owneruserid=$8 where idRestaurant=$9',
      [restaurant.name, restaurant.address, restaurant.opening, restaurant.closing, restaurant.img, restaurant.type, restaurant.pricelvl, restaurant.owneruserid, id],
      callback
    );
  }
};
  
module.exports = restaurants;