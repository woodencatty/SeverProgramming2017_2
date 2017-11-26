const ADXL345 = require('adxl345-sensor');  //가속도 센서 모듈
const adxl345 = new ADXL345();              //가속도 센서 정의

var data = require('./model.js');
var ml = require('machine_learning');
var accel = require('./sensor.js');

var dt = new ml.DecisionTree({
data : data.data,
result : data.result
});

dt.build();
dt.prune(1.0); // 1.0 : mingain.                    

// 가속도 센서 초기화
adxl345.init()
    .then(() => {
    })
    .catch((err) => console.error(`ADXL345 initialization failed: ${err} `));

//가속도값 측정 모듈화
setInterval(() => {
    adxl345.getAcceleration(true) // true for g-force units, else false for m/s²
        .then((acceleration) => {
            //가속도값(X, Y, Z) 반환
            console.log(acceleration.x + " " + acceleration.y + " " + acceleration.z);
            console.log(dt.classify([acceleration.x.toFixed(3), acceleration.y.toFixed(3), acceleration.z.toFixed(3)]));            
        })
        .catch((err) => {
            console.log(`ADXL345 read error: ${err}`);
        });
}, 1000)
