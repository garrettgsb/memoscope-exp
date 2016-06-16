const express = require('express');
const router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('cards', { title: 'All Cards Information', username: req.session.username});
});

router.get('/new', function(req, res, next) {
  res.render('card-new', { title: 'User Information', username: req.session.username} );
});

module.exports = router;
