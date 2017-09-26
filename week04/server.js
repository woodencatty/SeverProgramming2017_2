const http = require('http');
const url = require('url');
const os = require('os');

const myserver = (request, response)  => {
	const query = url.parse(request.url, true).query;
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end('wow '+os.platform());
}

const server=http.createServer(myserver);

server.listen(56001, ()=>{});
