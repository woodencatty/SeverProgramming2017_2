const fs = require('fs');
const jade = require('jade');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
// MySQL DB 연결
const client = mysql.createConnection({
    host: 'localhost', // DB서버 IP주소
    port: 3306, // DB서버 Port주소
    user: 'root', // DB접속 아이디
    password: 'gachon654321', // 비밀번호(설정X)
    database: 'mydb' //사용할 DB명
});
// 서버를 생성합니다.
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
// 서버를 실행합니다.
app.listen(65001, function () {
    console.log('server running at http://127.0.0.1:65001');
});
// 라우트를 수행합니다.
app.get('/insert', (request, response) => {
    fs.readFile('9-insert.jade', 'utf8', (error, data) => {
        //회원가입화면
        response.send(data); //가입화면전송
    });
});
app.get('/members', (request, response) => {
    fs.readFile('9-list.jade', 'utf8', (error, data) => { // List화면
        // 데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member', (error, results) => {
            // 응답합니다.
            response.send(jade.compile(data, {
                data: results
            }));
        });
    });
});

app.post('/insert', function (request, response) {
    // 변수를 선언합니다.
    var body = request.body;
    console.log(body.name);
    console.log(body.uid);
    console.log(body.pass);
    // 데이터베이스 쿼리를 실행합니다.
    client.query('INSERT INTO member (name, uid, pass) VALUES (?, ?, ?)', [body.name, body.uid, body.pass], () => {
        console.log("Insertion into DB was completed !");
        response.end('sucessfully added');
    });
});
