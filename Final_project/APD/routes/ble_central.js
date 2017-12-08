const bleno = require('bleno');
const util = require('util');
const control = require('./index.js');

var deviceName = 'APD';
var exercise_log_arr;
var data_count = 0;

var Characteristic = bleno.Characteristic;
var PrimaryService = bleno.PrimaryService;
var SwitchCharacteristic = function () {
    SwitchCharacteristic.super_.call(this, {
        uuid: 'ff11',
        properties: ['read', 'write'],
        descriptors: [
            new bleno.Descriptor({
                uuid: '2901',
                value: 'IDD'
            })
        ]
    });
};
util.inherits(SwitchCharacteristic, Characteristic);

SwitchCharacteristic.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
    console.log('write request');
    console.log(data);
    callback(this.RESULT_SUCCESS);
    };

var lightService = new PrimaryService({
    uuid: 'ff10',
    characteristics: [
        new SwitchCharacteristic()
    ]
});
bleno.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        bleno.startAdvertising(deviceName, [lightService.uuid]);
        console.log("-------------------------------");
        console.log("블루투스 > ON (" + deviceName + " 가동)");
    } else {
        bleno.stopAdvertising();
        console.log("블루투스 > Advertising 을 중단합니다");
    }
});

bleno.on('advertisingStart', function (error) {
    if (!error) {
    console.log("블루투스 > Advertising 을 시작합니다...");
    console.log("---------------------------------------");
    bleno.setServices([lightService]);
    }
    else
    console.log("블루투스 > Advertising 도중 오류발생");
    });
    // cleanup GPIO on exit
    function exit() {
    console.log("블루투스> 프로그램을 종료합니다");
    process.exit();
    }
    process.on('SIGINT', exit);