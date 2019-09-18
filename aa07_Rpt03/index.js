var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); //index.jade구조로 표시해줘라.
});


router.get('/aa07', function(req, res, next){
	res.render('aa07',{title: 'Express App',
id: 'AA07',
name : ' parkJinseok'});
});
module.exports = router;
