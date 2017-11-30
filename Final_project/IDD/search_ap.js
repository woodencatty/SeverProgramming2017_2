const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import

var wifi = require('node-wifi');
var searched = false;

const fs = require('fs');

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null 
});

module.exports = {
    searchAPD: (apName, password, connectRange, leaveRange) => {
        wifi.getCurrentConnections((err, curcon) => {
           //console.log(curcon[0].signal_level);
            //todo : check signal
            if (curcon[0].signal_level > connectRange) {
                if (searched == false) {
                    sendData.SubmitIDDname('IDD001');
                    fs.readFile('./exercise_log', 'utf8', function (error, readtext) { sendData.SubmitUserExercise('IDD001', readtext);});
                    searched = true;
                } else if (searched == true) {
                }
            } else if (curcon[0].signal_level < leaveRange) {
                sendData.SubmitUserLeave();
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

