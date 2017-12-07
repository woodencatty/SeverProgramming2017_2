const exercise = require('./svm_exercise.js')   //운동량 측정 모듈 import
//const scanAP = require('./search_ap.js')   //포스터기기 탐색 모듈 import
const bluetooth = require('./ble_pher.js')   

const fs = require('fs');
require('date-utils');

let dateTime = new Date();

/*
function scanInterval(apName, connectRange, leaveRange, password, scanInterval) {
  this.scanInterval = setInterval(() => {
    scanAP.searchAPD(apName, password, connectRange, leaveRange);
  }, scanInterval);
}
*/
function StepInterval(AccelInterval, walkThreadhold, forceSenseTime) {
  this.valueInterval = setInterval(() => {
    exercise.setStepCount(walkThreadhold, forceSenseTime);
  }, AccelInterval);
}


function loggingInterval(loggingInterval, filename, fsOption) {
  console.log("logging");
  //5초에 한번 걸음 수를 업데이트하여 로그에 저장함.
  /*
  this.loggingInterval = setInterval(() => {
    ExerciseCallback = (Action) =>{
      fs.open(filename, fsOption, (err, fd) =>{
        if (err) throw err;
        var buf = new Buffer(Action.toString() + ',' + dateTime.toFormat('YYYY,MM,DD,HH24,MI,SS') + '\n');
        fs.write(fd, buf, 0, buf.length, null, (err, written, buffer) =>{
          if (err) throw err;
          fs.close(fd, () => {
          });
        });
      });
    }
    exercise.getExercise(ExerciseCallback);
  }, loggingInterval);*/

  this.loggingInterval = setInterval(() => {
    StepCountcallback = (StepCount) =>{
      fs.open(filename, fsOption, (err, fd) =>{
        if (err) throw err;
        var buf = new Buffer(StepCount.toString() + ',' + dateTime.toFormat('YYYY-MM-DD HH24:MI:SS') + ']');
        fs.write(fd, buf, 0, buf.length, null, (err, written, buffer) =>{
          console.log(buf.toString());          
          if (err) throw err;
          fs.close(fd, () => {
            exercise.resetStepCount();
          });
        });
      });
    }
    exercise.getStepCount(StepCountcallback);
  }, loggingInterval);
}

function initialize() {
  fs.readFile('./settings.conf', 'utf8',(err, data)=> {
    //저장한 활동량 로그에서 데이터를 읽어 전송한다.
    var config = JSON.parse(data);
    StepInterval(config.AccelInterval, config.walkThreadhold, config.forceSenseTime);    
   // scanInterval(config.apName, config.connectRange, config.leaveRange, config.password, config.scanInterval);
    loggingInterval(config.LoggingInterval, config.ExerciseDataFileName, config.fsOption);
  });
}

initialize();
