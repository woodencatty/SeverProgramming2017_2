var express = require('express');
var router = express.Router();

//const sensor = require('./sensor.js');
const AP = require('./hotSpot.js');
const restAPI = require('./rest_api.js');
const fs = require('fs');
const http = require('http');

let refreshInterval = 0;
let IDD_ID = "";

function Setup_IDD_Socket(){
  http.createServer((request, response) => {
    if (request.method == 'POST') {
      if (request.url == '/identify/information') {
        console.log(request);
        response.writeHead(404);
        response.end("gotit");
      } else if (request.url == '/patient/exercise') {
        console.log(request);      
        response.end("gotit");
      }
      else {
        console.log("error");
        response.writeHead(404);
        response.end();
      }
    } /* GET method */
  }).listen(3010, () => {
    console.log('Server Running (3010) ...');
  });
}

function initialize() {
  fs.readFile('./settings.conf', 'utf8', function (err, data) {
    var config = JSON.parse(data);
    Setup_IDD_Socket();    
    /* AP.setupAP(config.ssid, config.password, true, config.adaptor);
      interval = config.refreshInterval;*/
  });

}


/* GET home page. */
router.get('/', function (req, res, next) {
  if (IDD_ID == "") {
    res.render('index', { Interval: refreshInterval/*, temp: sensor.getTemp, humi: sensor.getHumi*/ });
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


/*
router.post('/identify/information', (req, res, next) => {
  console.log(req.header.IDD_ID);
  res.end('gotit');
});

router.post('/patient/exercise', (req, res, next) => {
  console.log(req.header.exercise);
  res.end('gotit');
});
*/
initialize();

module.exports = router;
