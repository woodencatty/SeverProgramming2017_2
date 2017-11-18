const http = require('http');

const server = http.createServer((request, response)=>{
response.writeHead(200, {'Content-Type':'text/html'});
response.write('<h1>Oh My God!</h1>');
response.end('==================');

});

server.on('connection', (code)=>{
console.log('Web Browser has request CONNECT');
});

server.on('request', (code)=>{
console.log('request event has occured');
});

server.listen(56008, ()=>{
	console.log('Server Waiting...56008');
});
