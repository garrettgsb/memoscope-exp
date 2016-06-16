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

//neeed to create these views
router.get('/users', function (req, res) {
  queryParams('SELECT * FROM users;', [], function (err, users) {
    if (err) return res.send(500);
    res.render('users-all', { title: JSON.stringify(users.rows) });
  })
});

//neeed to create these views
router.get('/users/new', function (req, res) {
  res.redirect('/users/new' + result.rows[0].id);
});
//neeed to create these views
router.get('/users/:id', function (req, res) {
  queryParams('SELECT * FROM users WHERE id = $1;', [req.params.id], function (err, users) {
    if (err) return res.send(500);
    res.send(JSON.stringify(users.rows[0]));
  })
});
//neeed to create these views
router.post('/users', function (req, res) {
  queryParams('INSERT INTO users (last_name, first_name) VALUES ($2, $3) RETURNING id;', [req.params.last_name, req.params.first_name], function (err, result) {
    if (err) return res.send(500);
    res.redirect('/users/' + result.rows[0].id);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});

module.exports = router;
