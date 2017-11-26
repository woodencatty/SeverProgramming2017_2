var data = require('./model.js');
var ml = require('machine_learning');
var accel = require('./sensor.js');

var dt = new ml.DecisionTree({
data : data.data,
result : data.result
});

dt.build();

dt.prune(1.0); // 1.0 : mingain.                    

setInterval(()=>{
    getExercisecallback = (AccelX, AccelY, AccelZ) => {
        console.log((AccelX, AccelY, AccelZ));
        console.log(dt.classify([AccelX.toFixed(3), AccelY.toFixed(3), AccelZ.toFixed(3)]));
        }
 accel.getAccel(getExercisecallback);
},1000);
           