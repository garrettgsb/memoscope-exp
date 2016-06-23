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

var loadDecks;
var loadCards;

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
        cb(null, result.rows[0].id)
      }
      else {
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
router.get('/cards', function(req, res){
  queryParams('SELECT * FROM cards INNER JOIN decks on cards.deck_id=decks.id WHERE decks.user_id = $1', [req.session.user_id],
    function(err, myCards){
      res.render('cards', {username: req.session.username, cards: myCards.rows});
    });
});

router.get('/cards/all', function(req, res){
  queryParams('SELECT * FROM cards', [],
    function(err, myCards){
      if (err){
        console.log("o my jimmies, got an error getting all cards: " + err);
      }
      res.json(myCards.rows);
    });
});

router.get('/viz', function(req, res){
      // console.log(myCards);
      res.render('viz');
});

router.get('/cards/new', function(req,res){
  res.render('cards-new', { title: "New Card" });
});

router.post('/cards/create', function(req, res){
  console.log("now beginning code for POST /cards/create")
  // Put a new card into the database
  // User ID currently hard coded to 1 in 'card-new.js'
  var deck_id;
  content_html = req.body.content_html;
  deck_name = req.body.deck;
  console.log(`Selecting ${deck_name} from db`)
  queryParams('SELECT * FROM decks WHERE name = $1', [deck_name], function(err,result){
    if (err) {
      console.log("DB error during deck search: ", err);
    }
    if (result.rows[0]) {
      deck_id = result.rows[0].id;
      console.log("Calling create card with old deck");
      console.log(deck_id, content_html);
      createCard(deck_id, content_html);
    } else {
      queryParams('INSERT INTO decks (user_id, name, created_at, modified_at) VALUES ($1, $2, current_timestamp, current_timestamp);',
                [1, deck_name], function(err, callback){
        if (err) {console.log("DB error putting card into deck: ", err);}
        queryParams('SELECT * FROM decks WHERE name=$1', [deck_name],function(err,result){
          console.log("DB error searching for NEWLY CREATED deck: ", err);
          deck_id = result.rows[0].id
          console.log("Calling create card with new deck");
          createCard(deck_id, content_html);
        });
      }); // Query insert decks
    } // Else
  })


  function createCard(deck_id, content_html){
    queryParams('INSERT INTO cards (deck_id, content_html, orbit, notified_at, created_at, modified_at) VALUES ($1, $2, 0, $3, current_timestamp, current_timestamp)',
      [deck_id, req.body.content_html, req.body.notifiedAt],
      function(err, result){
        if (err) {console.log("DB ERROR in createCard: " + err) };
        console.log("createCard database call is now finished.");
        res.send({'happy':'maybe'});  // how's that for frickin' useless
    }); // Query insert cards
  } // createCard()
}); // Router post

router.post('/cards/update', function(req,res){
  queryParams('UPDATE cards SET orbit=$1, notified_at=$2 WHERE id=$3', [req.body.orbit, req.body.notifiedAt, req.body.id], function(err, response){
      if (err) { console.log(err) };
      res.send();
  });
});
// router.get('/cards/:id', function(req, res){
//   queryParams('SELECT * FROM cards WHERE id = $1',
//              [req.params.id], function(err, myCard){
//              res.send({card: myCard});
//    })
// });

router.post('/cards/delete/:id', function(req,res){
  queryParams('DELETE FROM cards WHERE id = $1;', [req.params.id], function(err, result){
    if(err){console.log("Oops: ", err)};
    res.send({"deleted": result});
  });
});

router.get('/cards/:id', function(req,res){
  queryParams('SELECT * FROM cards WHERE id =$1;',
    [req.params.id], function(err,myCard){
    res.render('card', {title: 'Card', card: myCard.rows[0]})
    });
});

// router.put('/cards/:id', function(req, res){
//   // Submit edited card data
// });

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

// router.get('/decks/:id', function(req,res){
//     queryParams('SELECT * FROM decks WHERE id =$1',
//     [req.params.id], function(err,myDeck){
//       console.log("myDeck: ", myDeck)
//     res.render('deck', {title: 'deck', card: myDeck})
//     });
// });

router.get('/dashboard', function(req,res){
    queryParams('SELECT * FROM decks', [], function(err, decks){
      queryParams('SELECT * FROM cards', [], function(err, cards){
        loadDecks = decks;
        loadCards = cards;
        res.render('dashboard', {title: 'dashboard', cards: loadCards.rows, decks: loadDecks.rows})
      });
    });
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
    req.session.user_id = user.rows[0].id;
    req.session.username = user.rows[0].username;
    res.render('index', {title: "Index", username: req.session.username});
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
//decks
router.get('/decks', function(req, res){
  queryParams('SELECT * FROM decks', [], function(err, decks){
    console.log('decks: ', decks);
    res.render('decks', {decks: decks.rows, username: req.session.username});
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memoscope', username: req.session.username });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});

module.exports = router;
