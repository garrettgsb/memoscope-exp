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

// CARD ROUTES
router.get('/cards', function(req, res){
  queryParams('SELECT * FROM cards WHERE user_id = $1',
              [req.session.user_id],
              function(err, myCards){
              res.send({cards: myCards});
            });
});

router.get('/cards/new', function(req,res){
  res.render('cards-new', { title: "New Card" });
});

router.post('/cards/new', function(req,res){
  // Put a new card into the database
});

router.get('/cards/:id', function(req, res){
  queryParams('SELECT * FROM cards WHERE id = $1',
             [req.params.id], function(err, myCard){
             res.send({card: myCard});
   })
});

router.put('/cards/:id', function(req, res){
  // Submit edited card data
});

// DECK ROUTES
router.get('/decks', function(req, res){
  // Show all user decks
});

router.put('/decks', function(req,res){
  //TODO: Come up with proper data endpoints from Request
  queryParams('INSERT INTO decks (name, user_id) VALUES($1, $2)',
              [req.deckName, req.userId],
              function(err, return) {
                router.get('/decks'); // I guess. I dunno.
              }
});

router.get('/decks/:id', function(req,res){


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
