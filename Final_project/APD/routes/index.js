var express = require('express');
var router = express.Router();

const sensor = require('./sensor.js');
//const AP = require('./hotSpot.js');
const restAPI = require('./rest_api.js');
const bluetooth = require('./ble_central.js')   

const fs = require('fs');
const http = require('http');

let refreshInterval = 1;
let APD_ID = "";
let IDD_ID = "";

let User_Name = "";
let User_Exercise = "";
/*
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
        restAPI.SubmitUserExercise(request.headers.idd_id, request.headers.exercise);
        console.log(request.headers.exercise);
        console.log(request.headers.idd_id);
        IDD_ID = request.headers.idd_id;        
        response.end("gotit");
        restAPI.SubmitUserExercise(request.headers.idd_id, request.headers.exercise);
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
    } 
  }).listen(3010, () => {
    console.log('Socket is Running (3010) ...');
  });
}
*/

function initialize() {
  fs.readFile('./settings.conf', 'utf8', function (err, data) {
    var config = JSON.parse(data);
    //Setup_IDD_Socket();
    /* AP.setupAP(config.ssid, config.password, true, config.adaptor);
      interval = config.refreshInterval;*/
    APD_ID = config.deviceName;
    restAPI.init(config.serverIP, config.serverPort);
  });
  console.log("Page is Running..(3000)");
}


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("routed to /")
  Statuscallback = (returnData) => {

    detectcallback = (deviceName)=>{
      IDD_ID = deviceName;
    }

    bluetooth.IDD_found(detectcallback);
    console.log("get data : " + returnData);
    if(returnData == "1"){
      if (IDD_ID == "") {
       /* res.render('index', { Interval: refreshInterval, temp: 0, humi: 0});
        */
        sensorcallback = (temp, humi)=>{
          res.render('index', { Interval: refreshInterval, temp: temp, humi: humi });
        }
        sensor.getTemp(sensorcallback);
      } else {
        res.redirect('/detected');
      }}else {res.redirect('/unactivated');}
  }
  restAPI.requestDeviceStatus("APD001",  Statuscallback);

});

router.get('/unactivated', function (req, res, next) {
  res.render('index_unactive');
});

router.get('/detected', function (req, res, next) {
  Identifycallback = (returnData) => {
    User_Name = returnData; // 환자이름 빼먹음;
    var tts_query = "안녕하세요! "+User_Name+"님! 같이 운동 해볼까요?"
    res.render('detected', { username: User_Name, query: tts_query});
  }
  restAPI.requestUserInfo(IDD_ID,Identifycallback);
});

router.get('/search_exercise', function (req, res, next) {
  dentifycallback = (returnData) => {
    User_Exercise = returnData; // 환자이름 빼먹음;
    res.redirect('/'+returnData);
  }
  restAPI.requestUserExercise(IDD_ID,dentifycallback);
});

router.get('/reset', function (req, res, next) {
  IDD_ID = "";
  User_Exercise = "";
  User_Name = "";
  
  res.render('reset');
});

router.get('/exercise1', function (req, res, next) {
  var tts_query = "저를 따라 주먹을 쥐었다 폈다 해봐요!"
  
  res.render('exercise1', {query: tts_query});
});

router.get('/exercise2', function (req, res, next) {
  var tts_query = "저를 따라 뒷짐을 지고, 올려 봅시다!"
  
  res.render('exercise2', {query: tts_query});
});

router.get('/end', function (req, res, next) {
  var tts_query = "수고하셨어요! 이제 휴식을 취하는게 좋을 것 같아요."
  
  res.render('end', {query: tts_query});
});

initialize();

module.exports = router;
