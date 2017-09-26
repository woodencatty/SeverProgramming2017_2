const http = require('http');

const server = http.createServer((request, response)=>{
	response.writeHead(200, {'Content-Type':'text/html'});
	response.write('<h1> sever is closing in..</h1>');
	response.end();
});

server.on('connection',(code)=>{
	console.log('connection on : '+ code);
});

server.on('request', (code)=>{
	console.log('requeset on: '+ code);
});

server.on('close',(code)=>{
	console.log('server closed : '+ code);
});
server.listen(52273, ()=>{
	console.log('sever is running');
});

setTimeout(()=>{server.close();}, 10000);


