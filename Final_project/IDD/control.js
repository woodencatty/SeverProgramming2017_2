const exercise = require('./exercise.js')   //운동량 측정 모듈 import
const scanAP = require('./search_ap.js')   //포스터기기 탐색 모듈 import


const fs = require('fs');
const winston = require('winston');
require('date-utils');

let dateTime = new Date();


function scanInterval(apName, rssi, password, scanInterval) {
  this.scanInterval = setInterval(() => {
    scanAP.searchAPD(apName, password, rssi);
  }, scanInterval);
}

function moveInterval(AccelInterval, ExerciseThreadhold, forceSenseTime) {
  this.moveInterval = setInterval(() => {
    exercise.setExerciseCount(ExerciseThreadhold, forceSenseTime);
  }, AccelInterval);
}

function loggingInterval(loggingInterval, filename, fsOption) {
  //5초에 한번 걸음 수를 업데이트하여 로그에 저장함.
  this.loggingInterval = setInterval(() => {
    ExerciseCallback = function (ExerciseCount) {
      fs.open(filename, fsOption, function (err, fd) {
        if (err) throw err;
        var buf = new Buffer(ExerciseCount + ',' + dateTime.toFormat('YYYY,MM,DD,HH24,MI,SS') + '\n');
        winston.log('debug', ExerciseCount + ',' + dateTime.toFormat('YYYY,MM,DD,HH24,MI,SS') + '\n');

        fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
          if (err) throw err;
          fs.close(fd, () => {
          });
        });
      });
    }
    exercise.getExerciseCount(ExerciseCallback);
  }, loggingInterval);
}

function initialize() {
  winston.log('debug', "IDD initialized");
  fs.readFile('./settings.conf', 'utf8', function (err, data) {
    //저장한 활동량 로그에서 데이터를 읽어 전송한다.
    var config = JSON.parse(data);
    scanInterval(config.apName, config.sensitive, , config.password, config.scanInterval);
    moveInterval(config.AccelInterval, config.ExerciseThreadhold, config.forceSenseTime);
    loggingInterval(config.LoggingInterval, config.ExerciseDataFileName, config.fsOption);
    winston.level = config.loglevel;
  });
}

initialize();
