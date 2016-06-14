'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    content: DataTypes.STRING,
    orbit: DataTypes.INTEGER,
    next_notification_time: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.Deck, {as: 'Deck'});
      }
    }
  });
  return Card;
};