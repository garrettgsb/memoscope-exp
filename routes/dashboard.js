const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("normal route");
  res.render('dashboard', { title: 'Dashboscope' });
});

module.exports = router;
