const express = require('express');
const router = express.Router();
// sequelize initialization
const Sequelize = require('sequelize');
var pg = require('pg').native;
var config = require('../db_config');
var models = require('../server/models');
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
    console.log('Imported all models');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  // now hopefully we should be able to do:
  // models.user.findById()
  // models.card.findAll()
  // models.card.findOrCreate()
  // models.deck.findOrCreate()


module.exports = router;
