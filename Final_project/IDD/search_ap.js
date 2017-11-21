const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import

const scanner = require('node-wifi-scanner');


module.exports = {
    searchAPD: (apName, TargetRSSI) => {
        scanner.scan((err, networks) => {
            if (err) {
                console.error(err);
                return;
            }
            if (networks.ssid == apName) {
                if (networks.rssi < TargetRSSI) {
                    sendData.SubmitIDDname(ID, () => {
                        sendData.SubmitUserExercise(exercise);
                    })
                }
            }
        });
    }

}

setInterval(()=>{
    scanner.scan((err, networks) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(networks);
    });
}, 1000);