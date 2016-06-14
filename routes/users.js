const express = require('express');
const router = express.Router();

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

User.findById(1).then(
  function(user){
    var user_name = user.username;
    console.log('Current user is: ' + user_name);
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Userscope' });
});

// NOTE: This should be /users/:id/decks but I'm
// not really sure how to do that properly yet.
// For the purposes of static markup, this route is fine.

//**Jordan: You literally put :id in the url. req.params to fetch it.

module.exports = router;
