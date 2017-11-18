const http = require('http');
const fs = require('fs');

var counter = 1;

const server = http.createServer((request, response)=>{
	let filename = 'page'+counter+'.html';
	fs.readFile(filename, (error, data)=>{
			response.writeHead(200,'utf8', {'content-Type':'text/html'});
			response.end(data);
			if(counter > 2){counter = 1} else {counter ++;}
	});
});

server.listen(65501, ()=>{
	console.log('Shopping mall sever is running on ...65501');
});
