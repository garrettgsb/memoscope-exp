// model definitions
console.log('connected to model.js');
// var Sequelize = require('sequelize');

 
module.exports = function (sequelize) {
    var User = sequelize.define("User", {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    });
    var Card = sequelize.define("Card", {
        content: Sequelize.STRING,
        timer: Sequelize.INTEGER
    }, {
        timestamps: true
    });
    var Deck = sequelize.define("Deck", {
        content: Sequelize.STRING,
    }, {
        timestamps: true
    });
    User.hasMany(Card, {as: 'UserCards'});
    User.hasMany(Deck, {as: 'Decks'});
    Deck.hasMany(Card, {as: 'DeckCards'});
    return {
        User: User,
        Card: Card,
        Deck: Deck,
    };
};