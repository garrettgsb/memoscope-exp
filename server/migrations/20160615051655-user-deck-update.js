'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return [
      queryInterface.removeColumn('Users', 'createdAt'),
      queryInterface.removeColumn('Users', 'updatedAt'),
      queryInterface.removeColumn('Decks', 'createdAt'),
      queryInterface.removeColumn('Decks', 'updatedAt')
      ];

  },

  down: function (queryInterface, Sequelize) {

  }
};
