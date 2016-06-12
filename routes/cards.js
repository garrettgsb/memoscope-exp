const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cards', { title: 'All Cards Information' });
});

router.get('/new', function(req, res, next) {
  res.render('card-new', { title: 'User Information'} );
});

module.exports = router;
