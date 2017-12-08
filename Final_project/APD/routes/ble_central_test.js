const noble = require('noble');


noble.on('stateChange', function (state) {
    if (state === 'poweredOn') {
        noble.startScanning(['ff10']);
    } else {
        noble.stopScanning();
    }
});
noble.on('discover', function (peripheral) {
    if (peripheral.advertisement.localName == 'IDD001') {
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
    peripheral.on('disconnect', onDisconnect);
}

function onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
    if (error) {
        console.log('Error discovering services and characteristics ' + error);
        return;
    }
    var switchCharacteristic = characteristics[0];

    

    switchCharacteristic.read ((error, data)=>{
        console.log(data);
            })
}

function onDisconnect(){
    console.log("연결이 해지되었습니다");
}