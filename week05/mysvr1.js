const http = require('http');
const fs = require('fs');
const jade = require('jade');

http.createServer((request,response)=>{
	if(request.method == 'GET'){
		if(request.url == '/'){
			fs.readFile('reg.jade','utf8', (error, data)=>{
				const fn = jade.compile(data);
				response.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
				response.end(fn());
			});
		}
	} else if(request.method == 'POST'){
		request.on('data', (data)=>{
			console.log('Post method requested'+ data);
			response.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
			response.end(data);
		});
	} else {
		console.log('other case requested...');
	}
}).listen(52273, ()=>{
	console.log('Server is Running now');
})
