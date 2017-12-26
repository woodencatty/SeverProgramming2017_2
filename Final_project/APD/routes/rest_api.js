const http = require('http');										//http 요청 모듈

var serverIP = "192.9.44.141";
var serverPort = "8082";

POST_APDError = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/device/error',
	method: 'POST'
};

var sys_error = "";


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
	method: 'GET'
};

GET_UserExercise = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/patient/exercise',
	method: 'GET'
};

GET_DeviceStatus = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/device/status',
	method: 'GET'
};

module.exports = {
	init: (IP, Port)=>{
		serverIP = IP;
		serverPort = Port;
	},


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
					console.log(chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
		}
		let req = http.request(POST_APDError, SubmitErrorcallback);						//POST요청 전송
		req.on('error', function (error) {
			console.log('관리서버와 연결할 수 없습니다.');	
			console.log(error);							// 관리서버와 연결 불가능할 때에 오류 체크
		});
		req.setHeader("apd_id", ID);											//헤더에 요청 데이터 첨부		
		req.setHeader("sys_error", sys_error);											//헤더에 요청 데이터 첨부

		req.end();
	},

	SubmitUserExercise: (ID, exercise) => {
		
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
					console.log(chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
		}
		let req = http.request(POST_UserExercise, SubmitUserExercisecallback);						//POST요청 전송
		req.on('error', function (error) {

			console.log('관리서버와 연결할 수 없습니다.');								// 관리서버와 연결 불가능할 때에 오류 체크
			console.log(error);
		});
		req.setHeader("idd_id", ID);											//헤더에 요청 데이터 첨부		
		req.setHeader("exercise", exercise);											//헤더에 요청 데이터 첨부


		req.end();
	},

	requestUserInfo: (ID, callback) => {

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
						callback(chunk.toString());
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출

				});
			}
		}

		let req = http.request(GET_UserInfo, getUserInfocallback);						//GET요청 전송
		req.on('error', function (error) {
			console.log('관리서버와 연결할 수 없습니다.'); 
			console.log(error);								// 관리서버와 연결 불가능할 때에 오류 체크
		});
		req.setHeader("idd_id", ID);											//헤더에 요청 데이터 첨부
		req.end();
	},
	requestUserExercise: (ID, callback) => {
		
				console.log(serverIP + serverPort);
				getUserExercisecallback = function (response) {
					console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
					if (response.statusCode != 200) {
						console.log('Error Response!');
		
						req.on('error', (e) => {
							console.error(`problem with request: ${e.message}`);
						});
					} else {
						let serverdata = '';
		
						response.on('data', function (chunk) {				
								callback(chunk.toString());
						});
						response.on('end', function () {									//응답이 끝났을 시 데이터 추출
		
						});
					}
				}
		
				let req = http.request(GET_UserExercise, getUserExercisecallback);						//GET요청 전송
				req.on('error', function (error) {
					console.log('관리서버와 연결할 수 없습니다.'); 
					console.log(error);								// 관리서버와 연결 불가능할 때에 오류 체크
				});
				req.setHeader("idd_id", ID);											//헤더에 요청 데이터 첨부
				req.end();
			},
	
	requestDeviceStatus: (ID, callback) => {
		
				console.log(serverIP + serverPort);
				getDeviceStatuscallback = function (response) {
					console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
					if (response.statusCode != 200) {
						console.log('Error Response!');
		
						req.on('error', (e) => {
							console.error(`problem with request: ${e.message}`);
						});
					} else {
						let serverdata = '';
		
						response.on('data', function (chunk) {
							console.log(chunk.toString());
								//var returnData = JSON.parse(chunk);				
								callback(chunk.toString());
						});
						response.on('end', function () {									//응답이 끝났을 시 데이터 추출
		
						});
					}
				}
		
				let req = http.request(GET_DeviceStatus, getDeviceStatuscallback);						//GET요청 전송
				req.on('error', function (error) {
					console.log('관리서버와 연결할 수 없습니다.');
					console.log(error); 								// 관리서버와 연결 불가능할 때에 오류 체크
				});
				console.log("sending REST");
				req.setHeader("apd_id", ID);											//헤더에 요청 데이터 첨부
				req.end();
			}

}    