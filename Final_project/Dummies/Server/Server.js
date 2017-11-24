const http = require('http');

function Setup_APD_Socket(){
    http.createServer((request, response) => {
      if (request.method == 'GET') {
        if (request.url == '/patient/information') {
          console.log(request.headers.idd_id);
          // 환자정보 반환
          response.writeHead(200);        
          response.end("김환자");      //보내는 부분. 가공이 필요함.
                }
        else {
          console.log("GET error");
          response.writeHead(404);
          response.end();
        }
      } /* GET method */ else if(request.method == 'POST'){
        if (request.url == '/device/error'){
            //에러수집
        }if (request.url == '/patient/exercise') {
            // 운동 프로그램 수집
        }else {
          console.log("POST error");
          response.writeHead(404);
          response.end();
        }
      }
    }).listen(65018, () => {
      console.log('Server Running (65018) ...');
    });
  }

  Setup_APD_Socket();    
  