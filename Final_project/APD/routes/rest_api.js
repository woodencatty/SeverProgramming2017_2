const http = require('http');										//http 요청 모듈

POST_APDError = {														//POST요청 JSON데이터 정의
	host: "",
	port: "",
	path: '/device/error',
	method: 'POST'
};

var sys_error = "";


POST_UserExercise = {														//POST요청 JSON데이터 정의
	host: "",
	port: "",
	path: '/patient/exercise',
	method: 'POST'
};

var exercise = 0;

GET_UserInfo = {														//POST요청 JSON데이터 정의
	host: "",
	port: "",
	path: '/patient/information',
	method: 'GET'
};

module.exports = {

	SubmitError: (ID, serverIP, serverPort) => {

		POST_APDError.host = serverIP;
		POST_APDError.port = serverPort;

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
					return chunk;	// 서버 데이터 받는부분
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

	SubmitUserExercise: (exercise, serverIP, serverPort) => {
		
		POST_UserExercise.host = serverIP;
		POST_UserExercise.port = serverPort;

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
					return chunk;	// 서버 데이터 받는부분
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

	requestUserInfo: (ID, serverIP, serverPort, callback) => {

		GET_UserInfo.host = serverIP;
		GET_UserInfo.port = serverPort;

		console.log(serverIP + serverPort);
		getUserInfocallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';

				response.on('data', function (chunk) {
						var returnData = JSON.parse(chunk);				
						callback(returnData);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출

				});
			}
		}

		let req = http.request(GET_UserInfo, getUserInfocallback);						//GET요청 전송
		req.on('error', function (error) {
			console.log('관리서버와 연결할 수 없습니다.'); 								// 관리서버와 연결 불가능할 때에 오류 체크
		});
		req.setHeader("idd_id", ID);											//헤더에 요청 데이터 첨부
		req.end();
	},

}    