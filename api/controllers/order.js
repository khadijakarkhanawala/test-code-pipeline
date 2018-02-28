'use strict';

const mysql = require('mysql');
const _ = require('lodash');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'mrsool-aurora-live-master.cntxc9xgznn4.us-west-2.rds.amazonaws.com',
  user: 'mrsool',
  password: 'k2rXerXQb5jVqvqmj',
  database: 'udel'
});

exports.get_orders = function(req, res){
  
  console.log(req.body);
  var req_params = req.body;

  con.connect((err) => {
    if (err) {
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  //If blank check in Aurora DB
  con.query('SELECT id,vStatus from udel.orders order by created_at desc limit 20', function (err, rows) {
    if (err){
      console.log("Error while receiving data from Aurora DB", err);
      res.setHeader('Content-Type', 'application/json');
      res.send({code: 400, message: `Error : ${err.message}`, data: {orders: []}});
    }else{
      console.log('Data received from Db:\n');
      let json = _.map(rows).map(function(x) {
        return {
          id: x.id,
          status: x.vStatus
        };
      });
      res.setHeader('Content-Type', 'application/json');
      res.send({code: 200, message: "Success", data: {orders: json}});
    }
  });

  con.end((err) => {
    console.log(err);
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
  });
      
};
