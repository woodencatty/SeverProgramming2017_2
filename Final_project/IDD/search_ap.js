const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import


var wifi = require('node-wifi');

wifi.init({
    iface : null // network interface, choose a random wifi interface if set to null 
});

module.exports = {
    searchAPD: (apName, TargetRSSI) => {
        wifi.getCurrentConnections((err, curcon)=>{
            console.log(curcon[0].signal_level);
            //todo : check signal
            if(curcon[0].signal_level < 20){
                sendData.SubmitIDDname('IDD001');
                sendData.SubmitUserExercise(20);
            }
        });
    }

}


/*
var piwifi = require('pi-wifi');

piwifi.connect('APD', '1q2w3e4r', (err)=>{
    //TODO : 연결
});
*/