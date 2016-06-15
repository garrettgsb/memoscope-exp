'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Decks', [{
      id: 1,
      UserId: 1,
      content: 'Poem Quotes',
      createdAt: '2016-06-14T12:00:00',
      updatedAt: '2016-06-14T12:00:00'
    }], {});
  },



  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Decks', null, {});



  }
};
