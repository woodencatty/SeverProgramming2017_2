var SoftAPSetup = require('softap-setup');

var sap = new SoftAPSetup();
sap.scan(callback);
function callback(err, dat) {
    if(err) { throw err; }
    console.log("Networks Identified:");
    console.log(dat);
};