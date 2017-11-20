var express = require('express');
var router = express.Router();

const sensor = require('./sensor.js')


/* GET home page. */
router.get('/', function(req, res, next) {

  sensor.senseDHT22();
  

  res.render('index', { title: 'Express' });
});

module.exports = router;
