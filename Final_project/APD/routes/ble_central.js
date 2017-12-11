const noble = require('noble');
const restAPI = require('./rest_api.js');

var DeviceName = "";

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
        DeviceName =  peripheral.advertisement.localName;
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

    readDataInterval = setInterval(()=>{
        switchCharacteristic.read ((error, data)=>{
            console.log(data);
            if(data == "end"){
                clearInterval(readDataInterval);
            }
                })
    }, 500);

}

module.exports = {
    IDD_found:(callback)=> {
        callback(DeviceName);
    }
  }