const http = require('http');

http.createServer((request, response)=>{
	const date = new Date();
	date.setDate(date.getDate()+7);

	response.writeHead(200, {'Content-Type':'text/html',
			         'Set-Cookie':['breakfast = toast; Expirees='+date.toUTCString(), 'dinner = chicken']
			  });

	response.end('<h1>' + request.headers.cookie + '</h1>');
	}).listen(52273, ()=>{
		console.log('sever is running in 52273');
	});
