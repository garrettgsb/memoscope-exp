const express = require('express');
const router = express.Router();
const session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("normal route");
  res.render('dashboard', { title: 'Dashboscope', username: req.session.username });
});

module.exports = router;
