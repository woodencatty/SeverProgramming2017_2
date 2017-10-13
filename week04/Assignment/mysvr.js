const http = require('http');
const fs = require('fs');
const jade = require('jade');

http.createServer(function (request, response) {
	if (request.method == 'GET') {
		if (request.url == '/') {
			fs.readFile('reg.jade', 'utf8', function (error, data) {
				const fn = jade.compile(data);
				response.writeHead(200,
					{ 'Content-Type': 'text/html;charset=utf8' });
				response.end(fn());s
			});
		}
	} else if (request.method == 'POST') {
		request.on('data', function (data) {
			console.log('Post method requested:' + data);
			response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' });
			response.end(data);
		});
	} else {
		console.log('other case requested...');
	}
}).listen(52273, function () {
	console.log('Server Running at http://127.0.0.1:52273');
});