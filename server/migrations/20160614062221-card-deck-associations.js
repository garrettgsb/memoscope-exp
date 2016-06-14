'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'Cards',
      'DeckId',
      {
          foreignKey: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'Decks',
            key: 'id' }
    });

  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.removeColumn('Cards', 'DeckId');
  }
};
