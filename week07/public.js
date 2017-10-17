// 모듈을 추출합니다.
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
// 웹 서버를 생성합니다.
const server = http.createServer(function (request, response) {
    // HTMLPage.html 파일을 읽습니다.
    fs.readFile('11-10.html', function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
    });
}).listen(52273, function () {
    console.log('Server running at http://127.0.0.1:52273');
});
// 소켓 서버를 생성 및 실행합니다.
const io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    // sendmsg 이벤트
    socket.on('sendmsg', function (data) {
        // public 통신
        console.log('클라이언트로부터 메시지가 왔습니다.!');
        io.sockets.emit('smart', data);
    });
});