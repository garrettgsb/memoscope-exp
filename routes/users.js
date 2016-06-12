const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Userscope' });
});

// NOTE: This should be /users/:id/decks but I'm
// not really sure how to do that properly yet.
// For the purposes of static markup, this route is fine.

//**Jordan: You literally put :id in the url. req.params to fetch it.

module.exports = router;
