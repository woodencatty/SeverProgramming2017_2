const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import


var wifi = require('node-wifi');
var piwifi = require('pi-wifi');

module.exports = {
    searchAPD: (apName, TargetRSSI) => {
    }

}

setInterval(()=>{
wifi.getCurrentConnections((err, curcon)=>{
    console.log(curcon[0].signal_level);
    //todo : check signal
});
}, 1000);

/*
piwifi.connect('APD', '1q2w3e4r', (err)=>{
    //TODO : 연결
});
*/