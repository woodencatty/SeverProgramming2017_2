var data = require('./model.js');


var ml = require('machine_learning');

var dt = new ml.DecisionTree({
data : data.data,
result : data.result
});

dt.build();

// dt.print(); // Show Trees

console.log("Classify : ", );

dt.prune(1.0); // 1.0 : mingain.
module.exports = {
        getExercise : (callback)=>{

            GetAccelCallback_2 = (AccelX, AccelY, AccelZ) => {
                    callback(dt.classify([AccelX.toFixed(3), AccelY.toFixed(3), AccelZ.toFixed(3)]));
                            }

        }
    
}