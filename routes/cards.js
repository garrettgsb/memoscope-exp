const express = require('express');
const router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('cards', { title: 'Every Single Cardoscope' });
});

router.get('/new', function(req, res, next) {
  res.render('card-new', { title: 'New Cardoscope'} );
});

module.exports = router;
