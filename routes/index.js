const express = require('express');
const router = express.Router();
// sequelize initialization
const Sequelize = require('sequelize');
var pg = require('pg').native;
var config = require('../db_config');
var db = require('../server/models');
var User = require('../server/models').User;
var Card = require('../server/models').Card;
var Deck = require('../server/models').Deck;
var sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      native: config.native
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});



// check database connection
sequelize.authenticate()
  .then(function(err) {
    console.log('Database Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  // now hopefully we should be able to do:
  // User.findById()
  // Card.findAll()
  // Card.findOrCreate()
  // Deck.findOrCreate()


module.exports = router;
