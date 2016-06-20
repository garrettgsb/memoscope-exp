const express = require('express');
const router = express.Router();

// database initialization
var pg = require('pg').native;

const connectionString = "postgres://development:development@localhost/memoscope";

function queryParams(sql, params, cb) {
  pg.connect(connectionString, function(err, db, done) {
    if (err) return cb(err);
    db.query(sql, params, function(err, result) {
      done();
      if (err) return cb(err);
      cb(null, result);
    });
  });
}
