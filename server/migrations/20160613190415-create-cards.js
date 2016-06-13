'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        foreignkey: true,
        type: Sequelize.INTEGER
      },
      deckId: {
        foreignKey: true,
        type: Sequelize.INTEGER
      },
     content: {
        type: Sequelize.TEXT
      },
      timer: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.dropTable('cards');
  }
};
