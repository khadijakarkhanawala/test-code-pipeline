'use strict';
module.exports = function(app) {
  var orders = require('../controllers/order');

  // Coordinates Routes
  app.route('/get_orders')
    .get(orders.get_orders);

};
