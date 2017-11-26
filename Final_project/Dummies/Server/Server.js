const http = require('http');

function Setup_APD_Socket() {
  http.createServer((request, response) => {
    if (request.method == 'GET') {
      if (request.url == '/patient/information') {
        console.log(request.headers.idd_id);
        client.query('SELECT * FROM patient WHERE deviceNumber = ?', [request.headers.idd_id], (err, rows) => {
          if (!rows.length) {
            response.writeHead(200);
            response.end(rows);      //보내는 부분. 가공이 필요함.
          } else {
            console.log("DB query Error!");
            response.writeHead(404);
            response.end();
          }
        });
      }
      else {
        console.log("GET error");
        response.writeHead(404);
        response.end();
      }
    } /* GET method */ else if (request.method == 'POST') {
      if (request.url == '/device/error') {
        //에러수집
      } if (request.url == '/patient/exercise') {
        // 운동 프로그램 수집
      } else {
        console.log("POST error");
        response.writeHead(404);
        response.end();
      }
    }
  }).listen(65009, () => {
    console.log('Server Running (65009) ...');
  });
}

Setup_APD_Socket();