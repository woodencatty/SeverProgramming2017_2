var data = require('./model.js');

var result = ['None','Premium','Basic','Basic','Premium','None','Basic','Premium','None','None','None','None','Basic','None','Basic','Basic'];

var ml = require('machine_learning');

var dt = new ml.DecisionTree({
data : data.data,
result : result
});

dt.build();

// dt.print();

console.log("Classify : ", dt.classify(['(direct)','USA','yes',5]));

dt.prune(1.0); // 1.0 : mingain.
dt.print();
module.exports = {

    
}