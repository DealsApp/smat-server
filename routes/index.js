var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // var url='http://api.8coupons.com/v1/getrealtimelocaldeals?key=60f85552d562c752f2bae2a210a679555b3afb3d4d2d5339cec21aa0937d756b570fc50b7c5a34d10d7ede9d84c80c91';
  // res.send(url);
});

module.exports = router;
