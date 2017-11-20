const temp = require('node-dht-sensor');             //온습도센서 모듈


let temperature = 23.5;
let humidity = 56.2;

module.exports = {
    //온습도측정 함수화
    senseDHT22: () => {
        temp.read(22, DHT22, (err, temp, humi) => {
            if (!err) {
                temperature = temp.toFixed(1);
                humidity = humi.toFixed(1);

            } else { console.log("Error detected in DHT22 sensor"); }
        });
    }
}
