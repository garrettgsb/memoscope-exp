'use strict';


module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users', [{
      username: 'joe',
      password: 'schmoe',
      createdAt: '2016-06-13T12:00:00',
      updatedAt: '2016-06-13T12:00:00'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('Users', null, {})

  }
};
