'use strict';


module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'joe',
      password: 'schmo',
      createdAt: '2016-06-14T12:00:00',
      updatedAt: '2016-06-14T12:00:00'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('Users', null, {});

  }
};
