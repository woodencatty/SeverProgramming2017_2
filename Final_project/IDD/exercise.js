var data = require('./model.js');

var result = ['None','Premium','Basic','Basic','Premium','None','Basic','Premium','None','None','None','None','Basic','None','Basic','Basic'];

var ml = require('machine_learning');

var dt = new ml.DecisionTree({
data : data.data,
result : result
});

dt.build();

// dt.print(); // Show Trees

console.log("Classify : ", );

dt.prune(1.0); // 1.0 : mingain.
module.exports = {
        getExercise : (callback)=>{
            callback(dt.classify(['(direct)','USA','yes',5]));
        }
    
}