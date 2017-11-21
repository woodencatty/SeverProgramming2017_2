var express = require('express');
var router = express.Router();

const sensor = require('./sensor.js')
const AP = require('./hotSpot.js')

let refreshInterval = 0;

function initialize() {
  fs.readFile('./settings.conf', 'utf8', function (err, data) {
      AP.setupAP(data.ssid, data.password, true, data.adaptor);
      interval = data.refreshInterval;
  });    

}


/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { Interval : refreshInterval, temp : sensor.getTemp, humi : sensor.getHumi });
});


router.post('/identify/information', function(req, res, next) {
      console.log(req.header.ID);
      res.end();
  });
  
router.post('/patient/exercise', function(req, res, next) {
  console.log(req.header.exercise);
  res.end();
  });
  
initialize();

module.exports = router;
