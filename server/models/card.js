'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('card', {
    content: { type: DataTypes.STRING, unique: true },
    timer: { type: DataTypes.INTEGER }
  });
  return Card;
};