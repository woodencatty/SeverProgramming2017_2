const http = require('http');
const fs = require('fs');

http.createServer((request, response)=>{
	if(request.method == 'GET'){
		if(request.url == '/a'){
			fs.readFile('a.html', (error, file)=>{
				response.writeHead(200, {
				'Content-type':'text/html'
				});
			response.end(file);
		} else if(request.url == '/b'){
			fs.readFile('music.png', (error, file)=>{
				response.writeHead(200, {
				'Content-type':'image/png'
				});
			response.end(file);
			});
	} else {
		response.writeHand(404);
		response.end();
	}
}).listen(52273, ()=>{
	console.log('sever running 52273 ...');
});
