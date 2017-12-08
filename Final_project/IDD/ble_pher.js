const noble = require('noble');
const restAPI = require('./rest_api.js');


noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        noble.startScanning(['ff10']);
    } else {
        noble.stopScanning();
    }
});
noble.on('discover', function (peripheral) {
    if (peripheral.advertisement.localName == 'APD') {
        console.log("블루투스> 찾았음(discovery) ------------------------- ");
        console.log("블루투스> 이름: " + peripheral.advertisement.localName);
        console.log("블루투스> 주소: " + peripheral.address);
        console.log("블루투스> 신호세기(RSSI): " + peripheral.rssi);
        console.log("------------------------------------");
    }
    connectAndSetUp(peripheral);
});

function connectAndSetUp(peripheral) {
    peripheral.connect(function (error) {
        var serviceUUIDs = ['ff10'];
        var characteristicUUIDs = ['ff11'];
        peripheral.discoverSomeServicesAndCharacteristics
            (serviceUUIDs, characteristicUUIDs,
            onServicesAndCharacteristicsDiscovered);
    });
    // attach disconnect handler
    // peripheral.on('disconnect', onDisconnect);
}

function onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
    if (error) {
        console.log('Error discovering services and characteristics ' + error);
        return;
    }
    var switchCharacteristic = characteristics[0];

        console.log("sending");
        fs.readFile('./exercise_log', 'utf8', function (error, readtext) {

            var buffer = new Buffer(readtext.toString(), 'utf8');
            switchCharacteristic.write(buffer, false, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('블루투스> 데이터전송(write): ' + buffer.toString());
                    // console.log(services); // peripheral 로부터 받은 profile 내용을 보려면 // 제거
                    // console.log(characteristics);
                }
            });
        });
}