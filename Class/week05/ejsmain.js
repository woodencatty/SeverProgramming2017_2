const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

http.createServer((request, response)=>{
	fs.readFile('7-8.ejs', 'utf8', (error, data)=>{
		response.writeHead(200, {'Content-Type':'text/html'});
		response.write('<meta charset=utf8>');
		response.end(ejs.render(data, {
			name:'ejs Practice',
			description: 'Hello ejs!'
			}
		));
	});
}).listen(52273, ()=>{
	console.log('Sever is running');
});
