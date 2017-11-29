const Accel = require('./sensor.js');   //가속도 센서 모듈 import

//센서의 X, Y, Z값을 받아온다.

//변환하여 저장할 값.
let i = 0;
let StepCount = 0;

let AccelX_1 = 0.0;
let AccelY_1 = 0.0;
let AccelZ_1 = 0.0;

let AccelX_2 = 0.0;
let AccelY_2 = 0.0;
let AccelZ_2 = 0.0;

let changeX = 0.0;
let changeY = 0.0;
let changeZ = 0.0;

let count_flag = false;

module.exports = {
    setStepCount: (ExerciseThreadhold, forceSenseTime) => {
        GetAccelCallback_1 = (AccelX, AccelY, AccelZ) => {


            AccelX_1 = AccelX;
            AccelY_1 = AccelY;
            AccelZ_1 = AccelZ;

        }

        Accel.getAccel(GetAccelCallback_1);

        setTimeout(() => {
            GetAccelCallback_2 = (AccelX, AccelY, AccelZ) => {

                AccelX_2 = AccelX;
                AccelY_2 = AccelY;
                AccelZ_2 = AccelZ;
            }

            Accel.getAccel(GetAccelCallback_2);

            changeX = Math.abs(Math.abs(AccelX_1) - Math.abs(AccelX_2));
            changeY = Math.abs(Math.abs(AccelY_1) - Math.abs(AccelY_2));
            changeZ = Math.abs(Math.abs(AccelZ_1) - Math.abs(AccelZ_2));

            let force = (changeX + changeY + changeZ) * 10000

            i++;
            if (force > ExerciseThreadhold) {
                if (!count_flag) {
                    StepCount++;
                    count_flag = true;
                    console.log(StepCount);
                }
            } else {
                count_flag = false;
            }
        }, forceSenseTime);
    },
    getStepCount: (callback) => {
        callback(StepCount);
    },
    resetStepCount: () => {
        StepCount = 0;
    }
}
