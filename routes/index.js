// route requirements
const express = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(cookieParser());
app.use(session({secret: "stringofwords",
    resave: true,
    saveUninitialized: true
    }));

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

//Homepage routes
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  queryParams('SELECT * FROM users WHERE id =$1;',
    [req.params.user_id], function(err,user){
      if (err) return console.log(err);
      req.session.user_id = user.rows[0].id;
      req.session.username = user.rows[0].username;
      queryParams('SELECT * FROM decks WHERE user_id =$2;', [req.params.user_id], 
        function (err, decks) {
          if (err) return res.send(500);
          queryParams('SELECT * FROM cards WHERE deck_id =$3;', [decks.rows[0].id], 
            function (err, cards) {
              if (err) return res.send(500);
              res.render('dashboard', { 
                user_name: req.session.username,
                decks: decks.rows,
                cards: cards.rows 
              });
          });
      });
    });
});
//User routes
router.get('/users/new', function (req, res) {
    res.render('users-new');
});
router.post('/users/new', function (req, res) {
  queryParams('INSERT INTO users (name,password,created_at,modified_at) VALUES ($1,$2,current_timestamp,current_timestamp);',
    [req.body.user_name, req.body.password],
    function (err, result) {
      if (err) return console.log(err);
      res.render('index');
  })
});
//Deck routes
router.get('/decks/', function(req, res){
  queryParams('SELECT * FROM decks;', [], 
    function (err, decks) {
      if (err) return res.send(500);
      res.render('decks', { all_decks: decks.rows });
  })
});
router.post('/decks/new', function(req, res){
  queryParams('INSERT INTO decks (name,description,user_id,created_at,modified_at) VALUES ($1,$2,$3,current_timestamp,current_timestamp);',
    [req.body.deck_name,req.body.deck_description,req.body.user_id],
    function (err, result) {
      if (err) return res.send(500);
    })
});
router.put('/decks/:id', function(req,res){
  queryParams('SELECT * FROM decks WHERE id =$1;',
    [req.body.deck_id], 
    function(err,myCard){
      if (err) return res.send(500);
      queryParams('INSERT INTO decks (name,user_id,created_at,modified_at) VALUES ($1,$2,current_timestamp,current_timestamp);',
        [req.body.deck_name, req.body.user_id],
        function (err, result) {
          if (err) return res.send(500);
          res.render('decks', { all_decks: decks.rows });
        })
    })
});
router.delete('/decks/:id', function(req, res){
  queryParams('DELETE FROM decks WHERE id =$1;',[req.body.deck_id],
    function (err, result) {
      if (err) return res.send(500);
      res.render('decks', { all_decks: decks.rows });
    })
});

//Card routes
router.get('/cards/', function(req, res){
  queryParams('SELECT * FROM cards;', [], 
    function (err, cards) {
      if (err) return res.send(500);
      res.render('cards', { all_decks: cards.rows });
  })
});
router.post('/cards/new', function(req, res){
  queryParams('INSERT INTO cards (deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES ($1,$2,$3,$4,current_timestamp,current_timestamp);',
    [req.body.deck_id,req.body.content_html,0,null],
    function (err, result) {
      if (err) return res.send(500);
  })
});
router.put('/cards/:id', function(req,res){
  queryParams('SELECT * FROM cards WHERE id =$1;',
    [req.body.card_id], 
    function(err,card){
      if (err) return res.send(500);
      queryParams('INSERT INTO cards (deck_id, content_html, modified_at) VALUES ($1,$2,current_timestamp);',
        [req.body.deck_id,req.body.content_html],
        function (err, result) {
          if (err) return res.send(500);
          res.render('cards', { all_decks: cards.rows });
        })
    })
});
router.delete('/cards/:id', function(req, res){
  queryParams('DELETE FROM cards WHERE id =$1;',[req.body.card_id],
    function (err, result) {
      if (err) return res.send(500);
      res.render('cards', { all_decks: cards.rows });
    })
});
//
module.exports = router;
