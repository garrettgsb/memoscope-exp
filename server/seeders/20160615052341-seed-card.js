'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [
      { id: 1,
        DeckId: 1,
        content: '“ O Romeo, Romeo! wherefore art thou Romeo? ~William Shakespeare”',
        orbit: 0,
        next_notification_time: null,
        createdAt: '2016-06-14T12:00:00',
        updatedAt: '2016-06-14T12:00:00'},
      { id: 2,
        DeckId: 1,
        content: '“ We love the things we love for what they are. ~Robert Frost"',
        orbit: 0,
        next_notification_time: null,
        createdAt: '2016-06-14T12:01:00',
        updatedAt: '2016-06-14T12:01:00'},
      { id: 3,
        DeckId: 1,
        content: '“ You talk when you cease to be at peace with your thoughts. ~Kahlil Gibran”',
        orbit: 0,
        next_notification_time: null,
        createdAt: '2016-06-14T12:02:00',
        updatedAt: '2016-06-14T12:03:00'}
    ], {});
  },

  down: function (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Cards', null, {});
  }
};
