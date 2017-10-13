const http = require('http');
const fs = require('fs');
const jade = require('jade');
const querystring = require('querystring');

http.createServer(function (request, response) {
	if (request.method == 'GET') {
		if (request.url == '/') {
			fs.readFile('reg.jade', 'utf8', function (error, data) {
				let fn = jade.compile(data);
				response.writeHead(200, {
					'Content-Type': 'text/html;charset=utf8'
				});
				response.end(fn());
			});
		} else if (request.url == '/login') {
			fs.readFile('login.jade', 'utf8', function (error, data) {
				let fn = jade.compile(data);
				response.writeHead(200, {
					'Content-Type': 'text/html;charset=utf8'
				});
				response.end(fn());
			});
		}
	} else if (request.method == 'POST') {
		if (request.url == '/') {
			request.on('data', function (data) {
				let userInput = querystring.parse(data.toString());
				console.log(userInput);
				if (userInput.userpass1 == userInput.userpass2) {
					fs.writeFile('user.data', data.toString(), 'utf8', function (error) {
						console.log('회원가입 완료!');
						response.writeHead(301, {
							Location: "http://127.0.0.1:65003/login"
						});
						response.end();
					});
				} else {
					response.writeHead(500, {
						'Content-Type': 'text/html;charset=utf8'
					});
					response.end('<h1>회원가입 실패</h1><hr /><h2>다시 가입해주세요!</h2> ');
				}
			});
		} else if (request.url == '/login') {
			request.on('data', function (data) {
				let userInput = querystring.parse(data.toString());
				fs.readFile('user.data', 'utf8', function (error, readtext) {
					let storedUser = querystring.parse(readtext);
					if (userInput.userid == storedUser.userid) {
						if (userInput.userpass == storedUser.userpass1) {
							fs.readFile('welcome.jade', 'utf8', function (error, data1) {
								let fn = jade.compile(data1);
								response.writeHead(200, {
									'Content-Type': 'text/html;charset=utf8'
								});
								response.end(fn({
									name: storedUser.username
								}));
							});
						}
					} else {
						response.writeHead(500, {
							'Content-Type': 'text/html;charset=utf8'
						});
						response.end('<h1>로그인 실패</h1><hr /><h2>회원가입 하셨나요?</h2><h2>아이디, 비번이 틀렸어요!</h2> ');
					}
				});
			});
		}
	} else {
		response.writeHead(404, {
			'Content-Type': 'text/html;charset=utf8'
		});
		response.end('<h1>존재하지 않는 경로입니다.</h1>');
	}
}).listen(65003, function () {
	console.log('Server Running at http://127.0.0.1:65003');
});
