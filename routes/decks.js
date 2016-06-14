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

var user_name;

User.findById(1).then(
  function(user){
    user_name = user.username;
    console.log('Current user is: ' + user_name);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('decks', { title: 'Decks', layout: 'layout' });
});

module.exports = router;