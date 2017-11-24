var express = require('express');
var router = express.Router();

//const sensor = require('./sensor.js');
const AP = require('./hotSpot.js');
const restAPI = require('./rest_api.js');
const fs = require('fs');
const http = require('http');

let refreshInterval = 0;
let IDD_ID = "IDD001";

let serverIP = "";
let serverPort = "";

function Setup_IDD_Socket(){
  http.createServer((request, response) => {
    if (request.method == 'POST') {
      if (request.url == '/identify/information') {
        IDD_ID = request.headers.idd_id;
        response.writeHead(200);
        response.end("gotit");    //IDD에 확인메세지 전송
        console.log("Hi! "+ IDD_ID);   //환자 식별
      } else if (request.url == '/patient/exercise') {
        response.writeHead(200);        
        console.log(request.headers.exercise);        
        response.end("gotit");
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
    serverIP = config.serverIP;
    serverPort = config.serverPort;
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

  Identifycallback = (name)=>{
   res.render('detected', { username:name });
  }
  restAPI.requestUserInfo(IDD_ID, serverIP, serverPort, Identifycallback);

});


initialize();

module.exports = router;
