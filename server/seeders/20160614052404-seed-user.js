'use strict';


module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'joe',
      password: 'schmo'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('Users', null, {});

  }
};
