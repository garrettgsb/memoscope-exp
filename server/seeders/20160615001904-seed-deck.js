'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Decks', [{
      id: 1,
      UserId: 1,
      content: 'Poem Quotes'
    }], {});
  },



  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Decks', null, {});



  }
};
