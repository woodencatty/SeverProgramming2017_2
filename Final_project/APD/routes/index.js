var express = require('express');
var router = express.Router();

const sensor = require('./sensor.js');
const AP = require('./hotSpot.js');
const restAPI = require('./rest_api.js');

let refreshInterval = 0;
let IDD_ID = "";

function initialize() {
  fs.readFile('./settings.conf', 'utf8', function (err, data) {
    AP.setupAP(data.ssid, data.password, true, data.adaptor);
    interval = data.refreshInterval;
  });

}


/* GET home page. */
router.get('/', function (req, res, next) {
  if (IDD_ID == "") {
    res.render('index', { Interval: refreshInterval, temp: sensor.getTemp, humi: sensor.getHumi });
  } else {
    res.redirect('/detected');
  }
});

router.get('/detected', function (req, res, next) {
  let name = restAPI.requestUserInfo(IDD_ID);
  res.render('detected', { username: name }, () => {
    IDD_ID = "";
  });
});



router.post('/identify/information', (req, res, next) => {
  console.log(req.header.IDD_ID);
  res.end();
});

router.post('/patient/exercise', (req, res, next) => {
  console.log(req.header.exercise);
  res.end();
});

initialize();

module.exports = router;
