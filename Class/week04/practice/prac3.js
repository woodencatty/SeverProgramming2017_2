const http = require('http');
const fs = require('fs');


const server = http.createServer((request, response)=>{

if (request.method == 'GET') {
if (request.url == '/list') {
		fs.readFile('./page1.html', (error, data)=>{
			response.writeHead(200,'utf8', {'content-Type':'text/html'});
			response.end(data);
	});	
}
}

if (request.method == 'GET') {
if (request.url == '/cart') {	
		fs.readFile('./page2.html', (error, data)=>{
			response.writeHead(200,'utf8', {'content-Type':'text/html'});
			response.end(data);
	});
}
}

if (request.method == 'GET') {
if (request.url == '/under') {	
	response.writeHead(200, { 'Content-Type': 'text/html' });
response.end ('<h1>공사중..</h1>');
}
}

});

server.listen(65011, ()=>{
	console.log('Shopping mall sever is running on ...65011');
});
