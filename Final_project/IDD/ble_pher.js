const bleno = require('bleno');
const util = require('util');

var deviceName = 'IDD001';
var exercise_log = "";


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
    console.log('read request');
    var data = new Buffer(exercise_log, 'utf8');
    callback(this.RESULT_SUCCESS, data);
};
SwitchCharacteristic.prototype.onWriteRequest =
    function (data, offset, withoutResponse, callback) {

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