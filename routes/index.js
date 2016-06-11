const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Memoscope' });
});

module.exports = router;
