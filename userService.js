//data access logic
module.exports = function (sequelize) {
    var model = require("./model")(sequelize);
    var User = model.User;
    return {
        create: function (req, res) {
            var newUser = {
                username: req.body.username,
                password: req.body.password
            }
            User.create(newUser).success(function () {
                res.send(200);
            });
        },
        get: function (req, res) {
            User.findAll().success(function (users) {
                res.send(users);
            });
        }
    };
};