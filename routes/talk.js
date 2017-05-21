var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('talk', { title: 'Talk' });
});

router.post('/', function(req, res, next) {
  res.render('talk', { title: 'Talk', user: req.body.user });
});

module.exports = router;