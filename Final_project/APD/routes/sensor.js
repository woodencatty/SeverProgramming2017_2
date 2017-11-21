const temp = require('node-dht-sensor');             //온습도센서 모듈

module.exports = {
    //온습도측정 함수화
    getTemp: () => {
        temp.read(22, DHT22, (err, temp, humi) => {
            if (!err) {
                return temp.toFixed(1);
            } else { console.log("Error detected in DHT22 sensor"); }
        });
    },
    getHumi: () => {
        temp.read(22, DHT22, (err, temp, humi) => {
            if (!err) {
                return humi.toFixed(1);
            } else { console.log("Error detected in DHT22 sensor"); }
        });
    }
}
