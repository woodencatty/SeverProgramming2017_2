const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import

var wifi = require('node-wifi');
var searched = false;

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null 
});

module.exports = {
    searchAPD: (apName, password, TargetRSSI) => {
        wifi.getCurrentConnections((err, curcon) => {
            console.log(curcon[0].signal_level);
            //todo : check signal
            if (curcon[0].signal_level > -40) {
                if (searched == false) {
                    sendData.SubmitIDDname('IDD001');
                    sendData.SubmitUserExercise(20);
                    searched = true;
                } else if (searched == true) {
                }
            } else if (curcon[0].signal_level < 70) {
                searched = false;
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

