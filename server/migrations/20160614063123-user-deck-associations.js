'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'Decks',
      'UserId',
      {
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id' }
    });
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.removeColumn('Decks', 'UserId');

  }
};
