const http = require('http');										//http 요청 모듈

let serverIP = "192.9.44.52";
let serverPort = "3000";

let userID = 'noname';
let name = '';
let exercise = '';
let weight = 0;
let height = 0;
let age = 0;
let gender = 0;

POST_APDError = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/device/error',
	method: 'POST'
};

var sys_error = ""


POST_UserExercise = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/patient/exercise',
	method: 'POST'
};

var exercise = 0;

GET_UserInfo = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/patient/information',
	method: 'POST'
};



module.exports = {
    SubmitError: (ID) => {
		SubmitErrorcallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';
				response.on('data', function (chunk) {							//응답 데이터를 JSON형태로 파싱함
					serverdata = JSON.parse(chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
        }
        let req = http.request(POST_APDError, SubmitErrorcallback);						//POST요청 전송
		req.on('error', function (error) {

			console.log('관리서버와 연결할 수 없습니다.');								// 관리서버와 연결 불가능할 때에 오류 체크

		});
        req.setHeader("sys_error", sys_error);											//헤더에 요청 데이터 첨부
        
		req.end();
    },
    SubmitUserExercise: (exercise) => {
		SubmitUserExercisecallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';
				response.on('data', function (chunk) {							//응답 데이터를 JSON형태로 파싱함
					serverdata = JSON.parse(chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
        }
        let req = http.request(POST_UserExercise, SubmitUserExercisecallback);						//POST요청 전송
		req.on('error', function (error) {

			console.log('관리서버와 연결할 수 없습니다.');								// 관리서버와 연결 불가능할 때에 오류 체크

		});
        req.setHeader("exercise", exercise);											//헤더에 요청 데이터 첨부
        
		req.end();
    },
    
    requestUserInfo: (ID) => {
		//요청 데이터 수신 콜백함수
		getUserInfocallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';

				response.on('data', function (chunk) {							//응답 데이터를 JSON형태로 파싱함
					serverdata = JSON.parse(chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
					console.log(serverdata.patient_name);
					userID = ID;
					name = serverdata.patient_name;
					age = serverdata.patient_Age;
					height = serverdata.patient_Height;
					weight = serverdata.patient_Weight;
					gender = serverdata.patient_Gender;
					exercise = serverdata.patient_Exercise;

				});
			}
		}

		let req = http.request(getUserInfoRequest, getUserInfocallback);						//GET요청 전송
req.on('error', function(error) {
	console.log('관리서버와 연결할 수 없습니다.'); 								// 관리서버와 연결 불가능할 때에 오류 체크
});
		req.setHeader("idd_id", ID);											//헤더에 요청 데이터 첨부
		req.end();
	}
    

}    