const temp = require('node-dht-sensor');             //온습도센서 모듈

const DHT22 = 18; 

module.exports = {
    //온습도측정 함수화
    getTemp: (callback) => {
        temp.read(22, DHT22, (err, temp, humi) => {
            if (!err) {
                callback(temp, humi);
            } else { console.log("Error detected in DHT22 sensor"); }
        });
    }
}
