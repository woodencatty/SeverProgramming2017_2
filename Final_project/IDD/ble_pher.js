const bleno = require('bleno');
const util = require('util');
const fs = require('fs');

var deviceName = 'IDD001';
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

SwitchCharacteristic.prototype.onReadRequest = function (offset, callback) {
    fs.readFile('./exercise_log', 'utf8', function (error, readtext) { exercise_log_arr = readtext.split(']')});
    console.log('read request');
    if(data_count < exercise_log_arr.length){
        var data = new Buffer(exercise_log_arr[data_count], 'utf8');
        data_count++;
    }else{
        var data = new Buffer("end", 'utf8');
    }
    callback(this.RESULT_SUCCESS, data);
};

SwitchCharacteristic.prototype.onWriteRequest = function (data, offset, withoutResponse, callback) {
    console.log('write request');
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