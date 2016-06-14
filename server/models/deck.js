'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Deck.hasMany(models.Card, {as: 'Cards'});
        Deck.belongsTo(models.User, {as: 'User'});
      }
    }
  });
  return Deck;
};