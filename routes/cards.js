const express = require('express');
const router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('cards', { title: 'All Cards Information' });
});

router.get('/new', function(req, res, next) {
  res.render('card-new', { title: 'User Information'} );
});

// app.get('/', function (req,res) {
// 	if(req.session.access_token){
// 		getPosts(req, function(myPosts) {
// 		  res.render('index', {myName: req.session.username, posts: myPosts.data});
// 		});
// 	}else{
// 		res.render('index');
// 	}
// });


module.exports = router;
