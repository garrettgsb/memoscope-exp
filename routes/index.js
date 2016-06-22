const express = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
// database initialization
var pg = require('pg').native;

const connectionString = "postgres://development:development@localhost/memoscope";



app.use(cookieParser());
app.use(session({secret: "stringofwords",
    resave: true,
    saveUninitialized: true
    }));

var myDecks;
var myCards;

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

function findOrCreateDeck(deck, cb){
  var deck_id = "thing";
  queryParams("SELECT * FROM decks WHERE id = $1", [deck],
    function(err, result){
      if (result.rows[0]) {
        console.log(`Result is: ${result.rows[0].id}`);
        cb(null, result.rows[0].id)
      }
      else {
        console.log("Not found :\\");
        cb("Not found")
        // Create card, and return that buddy's ID.
      }
    })
  // return deck_id
}

//neeed to create these views
router.get('/users', function (req, res) {
  queryParams('SELECT * FROM users;', [], function (err, users) {
    if (err) return res.send(500);
    res.render('users-all', { title: users.rows });
  })
});

// CARD ROUTES

//All my cards
router.get('/cards', function(req, res){
  queryParams('SELECT * FROM cards INNER JOIN decks on cards.deck_id=decks.id WHERE decks.user_id = $1', [req.session.user_id],
    function(err, myCards){
      console.log('session ID: ', req.session.user_id);
      console.log('my cards: ', myCards);
      var active = [];
      var inactive = [];
      myCards.rows.forEach(function(e){
        if(e.orbit > 0){
          active.push(e);
        }else if(e.orbit == 0){
          inactive.push(e);
        }
      });
      console.log(active);
      res.render('cards', {username: req.session.username, active: active, inactive: inactive});
    });
});


// Test route for "viz" view AJAX call
router.get('/cards/all', function(req, res){
  queryParams('SELECT * FROM cards', [],
    function(err, myCards){
      console.log(myCards);
      res.json(myCards.rows);
    });
});

router.get('/viz', function(req, res){
      // console.log(myCards);
      res.render('viz');
});

router.get('/cards/new', function(req,res){
  res.render('card-new', { title: "New Card" });
});

router.post('/cards/create', function(req,res){
  // Put a new card into the database
  // User ID currently hard coded to 1 in 'card-new.js'
  var deck_id;
  content_html = req.body.content_html;
  deck_name = req.body.deck;
  console.log(`Selecting ${deck_name} from db`)
  queryParams('SELECT * FROM decks WHERE name = $1', [deck_name], function(err,result){
      if (result.rows[0]) {
      console.log(`Result ID: ${result.rows[0].id}`);
      console.log(`Result Name: ${result.rows[0].name}`);
      deck_id = result.rows[0].id;
      console.log("Calling createCard from 'if' block");
      createCard(deck_id, content_html);
      } else {
      console.log("Nah mate, there's no deck there.");
      queryParams('INSERT INTO decks (user_id, name, created_at, modified_at) VALUES ($1, $2, current_timestamp, current_timestamp);',
                  [1, deck_name], function(err, callback){
                    queryParams('SELECT * FROM decks WHERE name=$1', [deck_name],function(err,result){
                      console.log(`Result of insert query:`);
                      console.log(result);
                      deck_id = result.rows[0].id
                      console.log("Calling createCard from else block");
                      createCard(deck_id, content_html);
                    });
                  }); // Query insert decks
      } // Else
  })


  function createCard(deck_id, content_html){
    console.log(`Inside of createCard... Deck ID: ${deck_id}`); // TODO: Replace with retrieved/created value
    queryParams('INSERT INTO cards (deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES ($1, $2, 0, null, current_timestamp, current_timestamp)',
    [deck_id, req.body.content_html],
    function(err, redirect){
      //if (err) { console.log(err) };
      router.get('/');
    }); // Query insert cards
  } // createCard()


}); // Router post

router.post('/cards/update', function(req,res){
  console.log(req.body);
  queryParams('UPDATE cards SET orbit=$1, notified_at=$2 WHERE id=$3', [req.body.orbit, req.body.notifiedAt, req.body.id], function(err, response){
      if (err) { console.log(err) };
      res.send("Hi!");
  });
});

//Cards by ID
router.get('/cards/:id', function(req,res){
  queryParams('SELECT * FROM cards WHERE id =$1',
    [req.params.id], function(err,myCard){
      console.log("myCard: ", myCard)
    res.render('card', {title: 'Card', card: myCard.rows[0]})
    });
});

router.get('/cards/:id', function(req,res){
  queryParams('SELECT * FROM cards WHERE id =$1',
    [req.params.id], function(err,myCard){
      console.log("myCard: ", myCard)
    res.render('card', {title: 'Card', card: myCard.rows[0]})
    });
});

router.put('/cards/:id', function(req, res){
  // Submit edited card data
});

// DECK ROUTES

router.get('/decks/new', function(req, res){
  res.render('deck-new', { user_id: req.session.user_id });
});

router.post('/decks/new', function(req, res){
  queryParams('INSERT INTO decks (name,user_id,created_at,modified_at) VALUES ($1,$2,current_timestamp,current_timestamp);',
    [req.body.deck_name, req.body.user_id],
    function (err, result) {
      if (err) return console.log(err);
      res.send(JSON.stringify(req.body));
    })

});

// router.put('/decks', function(req,res){
//   //TODO: Come up with proper data endpoints from Request
//   queryParams('INSERT INTO decks (name, user_id) VALUES($1, $2)',
//               [req.deckName, req.userId],
//               function(err, return) {
//                 router.get('/decks'); // I guess. I dunno.
//               }
// });

router.get('/decks', function(req, res){
  queryParams('SELECT * FROM decks', [], function(err, decks){
    console.log('decks: ', decks);
    res.render('decks', {decks: decks.rows, username: req.session.username});
  });
});

//Decks by ID
router.get('/decks/:id', function(req,res){
    queryParams('SELECT * FROM cards FULL OUTER JOIN decks on cards.deck_id=decks.id WHERE decks.id = $1',
    [req.params.id], function(err,myCards){
      console.log("myCards: ", myCards)
    res.render('deck', {title: 'deck', cards: myCards.rows})
    });
});

router.get('/dashboard', function(req,res){
    queryParams('SELECT * FROM decks WHERE decks.user_id = $1', [req.session.user_id], function(err, decks){
      myDecks = decks;
    });
    // console.log('decks: ', myDecks.rows);
    queryParams('SELECT * FROM cards', [], function(err, cards){
      console.log("myCards: ", cards.rows);
      myCards = cards;
    });
    res.render('dashboard', {title: 'dashboard', cards: myCards, decks: myDecks})

});
// router.get('/user/decks', function(req, res){
//   queryParams('SELECT * FROM decks WHERE decks.user_id = $1', [req.session.user_id],
//     function(err, myDecks){
//       res.render('decks', {decks: myDecks.rows});
//     });
// });
//neeed to create these views
router.get('/users/new', function (req, res) {
  res.redirect('/users/new' + result.rows[0].id);
});
//neeed to create these views
router.get('/users/:id', function (req, res) {
  queryParams('SELECT * FROM users WHERE id = $1;', [req.params.id], function (err, users) {
    if (err) return res.send(500);
    console.log('users: ', users);
    res.send(users);
  })
});

//neeed to create these views
router.post('/users', function (req, res) {
  queryParams('INSERT INTO users (last_name, first_name) VALUES ($2, $3) RETURNING id;', [req.params.last_name, req.params.first_name], function (err, result) {
    if (err) return res.send(500);
    res.redirect('/users/' + result.rows[0].id);
  });
});
router.get('/login/as/:id', function(req, res){
  queryParams('SELECT * FROM users WHERE id = $1', [req.params.id], function(err, user){
    console.log('user rows: ', user.rows[0].username);
    req.session.user_id = user.rows[0].id;
    req.session.username = user.rows[0].username;
    res.render('index', {title: "Index", username: req.session.username});
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("username", req.session.username)
  res.render('index', { title: 'Memoscope', username: req.session.username });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});

module.exports = router;
