'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('deck', {
    content: { type: DataTypes.STRING, unique: true }
  }, {
    // classMethods: {
    //   associate: function(models) {
    //   },
    // },
  });
  return Deck;
};