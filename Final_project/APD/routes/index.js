var express = require('express');
var router = express.Router();

//const sensor = require('./sensor.js');
//const AP = require('./hotSpot.js');
const restAPI = require('./rest_api.js');
const fs = require('fs');
const http = require('http');

let refreshInterval = 1;
let APD_ID = "";
let IDD_ID = "";
let User_Name = "";

function Setup_IDD_Socket() {
  http.createServer((request, response) => {
    if (request.method == 'POST') {
      if (request.url == '/identify/information') {
        IDD_ID = request.headers.idd_id;
        response.writeHead(200);
        response.end("gotit");    //IDD에 확인메세지 전송
        console.log("Hi! " + IDD_ID);   //환자 식별
      } else if (request.url == '/patient/exercise') {
        response.writeHead(200);  
        console.log(request.headers.exercise);
        response.end("gotit");
      } else if (request.url == '/patient/leave') {
        response.writeHead(200);
        response.end("good-bye");
        let IDD_ID = "";
      }
      else {
        console.log("error");
        response.writeHead(404);
        response.end();
      }
    } /* GET method */
  }).listen(3010, () => {
    console.log('Socket is Running (3010) ...');
  });
}

function initialize() {
  fs.readFile('./settings.conf', 'utf8', function (err, data) {
    var config = JSON.parse(data);
    Setup_IDD_Socket();
    /* AP.setupAP(config.ssid, config.password, true, config.adaptor);
      interval = config.refreshInterval;*/
    APD_ID = config.deviceName;
    restAPI.init(config.serverIP, config.serverPort);
  });
  console.log("Page is Running..(3000)");
}


/* GET home page. */
router.get('/', function (req, res, next) {

  Statuscallback = (returnData) => {
    if(returnData){
      if (IDD_ID == "") {
        sensorcallback = (temp, humi)=>{
          res.render('index', { Interval: refreshInterval/*, temp: Temp, humi: Humi */});
        }
        sensor.getTemp(sensorcallback);
      } else {
        res.redirect('/detected');
      }}else {res.redirect('/unactivated');}
  }
  restAPI.requestDeviceStatus("APD001", serverIP, serverPort, Statuscallback);

    
});

router.get('/unactivated', function (req, res, next) {
    res.redirect('/index_unactive');
});

router.get('/detected', function (req, res, next) {

  Identifycallback = (returnData) => {
    User_Name = returnData.patientName; // 환자이름 빼먹음;
    res.render('detected', { username: User_Name });
  }
  restAPI.requestUserInfo(IDD_ID, serverIP, serverPort, Identifycallback);

});

router.get('/reset', function (req, res, next) {
  IDD_ID = "";
  res.render('reset');
});

router.get('/exercise_start', function (req, res, next) {
  IDD_ID = "";
  res.render('exercise_start');
});

initialize();

module.exports = router;
