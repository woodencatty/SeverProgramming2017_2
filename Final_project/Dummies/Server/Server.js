const http = require('http');


function Setup_APD_Socket() {
  http.createServer((request, response) => {
      if (request.method == 'GET') {
          if (request.url == '/patient/information') {
              console.log(request.headers.idd_id);
              client.query('SELECT * FROM patient WHERE deviceNumber = ?', [request.headers.idd_id], (err, rows) => {
                  console.log(err);                    
                  console.log(rows);                    
                  if (!rows.length) {
                      console.log("DB query Error!");
                      response.writeHead(404);
                      response.end();
                  } else {
                      response.writeHead(200);
                      response.end(rows[0].patientName.toString()); //보내는 부분. 가공이 필요함.
                  }
              });
          } else if (request.url == '/device/status') {
              console.log(request.headers.apd_id);
              client.query('SELECT activated FROM device WHERE deviceNumber = ?', [request.headers.apd_id], (err, rows) => {
                  console.log(err);                    
                  console.log(rows);                    
                  if (!rows.length) {
                      console.log("DB query Error!");
                      response.writeHead(404);
                      response.end();
                  } else {
                      response.writeHead(200);
                      response.end(rows[0].activated.toString()); //보내는 부분. 가공이 필요함.
                  }
              });
          } else {
              console.log("GET error");
              response.writeHead(404);
              response.end();
          }
      } /* GET method */
      else if (request.method == 'POST') {
          if (request.url == '/device/error') {
              //에러수집
          }
          if (request.url == '/patient/exercise') {
              // 운동 프로그램 수집
          } else {
              console.log("POST error");
              response.writeHead(404);
              response.end();
          }
      }
  }).listen(65009, () => {
      console.log('Device Socket Running (65009) ...');
  });
}

Setup_APD_Socket();
