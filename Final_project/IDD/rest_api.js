const http = require('http');										//http 요청 모듈

let serverIP = "192.168.42.1";
let serverPort = "3010";

POST_IDDname = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/identify/information',
	method: 'POST'
};


POST_UserExercise = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/patient/exercise',
	method: 'POST'
};

POST_Userleave = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/patient/leave',
	method: 'POST'
};

module.exports = {
	SubmitIDDname: (ID) => {
		SubmitIDDnamecallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';
				response.on('data', function (chunk) {							//응답 데이터를 JSON형태로 파싱함
						console.log("he says " + chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
		}
		let req = http.request(POST_IDDname, SubmitIDDnamecallback);						//POST요청 전송
		req.on('error', function (error) {

			console.log('can not connect to APD');								// 관리서버와 연결 불가능할 때에 오류 체크

		});
		req.setHeader("idd_id", ID);											//헤더에 요청 데이터 첨부
		console.log("message send!");
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
					console.log("he says " + chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
		}
		let req = http.request(POST_UserExercise, SubmitUserExercisecallback);						//POST요청 전송
		req.on('error', function (error) {
			console.log('can not connect to APD');								// 관리서버와 연결 불가능할 때에 오류 체크
		});
		console.log(exercise);
		req.setHeader("exercise", exercise);											//헤더에 요청 데이터 첨부
		req.setHeader("idd_id", ID);											//헤더에 요청 데이터 첨부
		
		req.end();
	}, 
	SubmitUserLeave: () => {
		SubmitUserLeavecallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';
				response.on('data', function (chunk) {							//응답 데이터를 JSON형태로 파싱함
					console.log("he says " + chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
		}
		let req = http.request(POST_Userleave, SubmitUserLeavecallback);						//POST요청 전송
		req.on('error', function (error) {

			console.log('can not connect to APD' + error);								// 관리서버와 연결 불가능할 때에 오류 체크

		});
		req.end();
	}
}    