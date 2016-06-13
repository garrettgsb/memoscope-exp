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
    Card.belongsTo(Deck, {foreignKey: 'fk_Deck'});
    Card.belongsTo(User, {foreignKey: 'fk_User'});
    Deck.belongsTo(User, {foreignKey: 'fk_User'});
    return {
        User: User,
        Card: Card,
        Deck: Deck,
    };
};