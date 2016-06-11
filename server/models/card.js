'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('Card', {
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      	Card.belongsTo(models.User)
      }
    }
  });
  return User;
};