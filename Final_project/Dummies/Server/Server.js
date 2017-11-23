const http = require('http');

function Setup_APD_Socket(){
    http.createServer((request, response) => {
      if (request.method == 'GET') {
        if (request.url == '/patient/information') {
          console.log(request.headers.idd_id);
          //IDD_ID = request.headers.idd_id;
          response.writeHead(200);        
          response.end("김환자");      //보내는 부분. 가공이 필요함.
                }
        else {
          console.log("error");
          response.writeHead(404);
          response.end();
        }
      } /* GET method */
    }).listen(65008, () => {
      console.log('Server Running (65008) ...');
    });
  }

  Setup_APD_Socket();    
  