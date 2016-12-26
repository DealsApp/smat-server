var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // var url='http://api.8coupons.com/v1/getrealtimelocaldeals?key=api_key';
  // res.send(url);
});

module.exports = router;
