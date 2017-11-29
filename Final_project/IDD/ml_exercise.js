var data = require('./ml_exercise_model.js');
var ml = require('machine_learning');
var accel = require('./sensor.js');

var dt = new ml.DecisionTree({
    data: data.data,
    result: data.result
});


// dt.print(); // Show Trees


module.exports = {
    getExercise: (callback) => {
        getExercisecallback = (AccelX, AccelY, AccelZ) => {
            dt.build();
            //console.log(dt.classify([AccelX.toFixed(3), AccelY.toFixed(3), AccelZ.toFixed(3)]));
            callback(dt.classify([AccelX.toFixed(3), AccelY.toFixed(3), AccelZ.toFixed(3)]));
            dt.prune(1.0); // 1.0 : mingain.            
        }
        accel.getAccel(getExercisecallback);
    }

}