const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const http = require('http');

var key = 'secret';
var logcheck = false;

const client = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'gachon654321',
	database: 'project'
});


function Setup_APD_Socket(){
    http.createServer((request, response) => {
      if (request.method == 'GET') {
        if (request.url == '/patient/information') {
          console.log(request.headers.idd_id);
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
    }).listen(65009, () => {
      console.log('Server Running (65009) ...');
    });
}

Setup_APD_Socket();    

router.get('/', (req, res, next)=>{
	if(logcheck){
		console.log(logcheck);
		res.render('login',{logincheck:true});
		logcheck = false;
	}else{
		res.render('login',{logincheck:false});
	}
});
router.get('/init', (req, res, next)=>{
	var enc = crypto.createCipher('aes192',key);
	var encpass = enc.update('1234','utf8','base64');
	encpass += enc.final('base64');
	fs.writeFile('settings.conf',encpass,'utf8');
	client.query('INSERT INTO medic (employeeNumber, id, password, belong, contact, address, birth) VALUES (?,?,?,?,?,?,?)',['1','medic',encpass,'한글','010-1234-5678','fff','1994/12/28'],(err)=>{
        console.log(err);
		res.redirect('/');
	});	
});
router.get('/init2', (req, res, next)=>{
	client.query('INSERT INTO device (deviceNumber, version, sort, activated, ipv4_address, ipv6_address, place) VALUES (?,?,?,?,?,?,?)',['1','1.0','cc',true,'200.1.1.1','200.1.1.1','home'],(err)=>{
        if(err) {console.log(err);}
	});	
    client.query('INSERT INTO patient (patientNumber, disease, status, exercise, deviceNumber) VALUES (?,?,?,?,?)',['1','mers','bad','50','1'],(err)=>{
        if(err) {console.log(err);}
	});	
    res.redirect('/');
});
router.get('/admin', (req, res, next)=>{
	if(req.session.user_id == 'admin'){
		req.session.now = (new Date()).toUTCString();
		res.render('home_manager',{id:req.session.user_id});
	}else{
		logcheck = true;
		res.redirect('/');
  	}
});
router.get('/medic', (req, res, next)=>{
	client.query('SELECT * FROM medic WHERE id = ?',[req.session.user_id],(err,rows)=>{
		if(!rows.length){
			logcheck = true;
			res.redirect('/');
		}else{
			req.session.now = (new Date()).toUTCString();
			res.render('home_doctor',{id:req.session.user_id});
		}
	});
});
router.get('/adminpass', (req, res, next)=>{
	if(req.session.user_id == 'admin'){
		req.session.now = (new Date()).toUTCString();
		res.render('adminpass');
	}else{
		logcheck = true;
		res.redirect('/');
  	}
});
router.get('/changemedic', (req, res, next)=>{
	client.query('SELECT * FROM medic WHERE id = ?',[req.session.user_id],(err,rows)=>{
		if(!rows.length){
			logcheck = true;
			res.redirect('/');
		}else{
			req.session.now = (new Date()).toUTCString();
			res.render('changemedic');
		}
	});
});
router.get('/devicemanager', (req, res, next)=>{
    if(req.session.user_id == 'admin'){
		req.session.now = (new Date()).toUTCString();
	    client.query('SELECT * FROM device',(err,rows)=>{
            if(!rows.length){
                logcheck = true;
			     res.redirect('/');
            }else{
                req.session.now = (new Date()).toUTCString();
                res.render('devicemanager',{data:rows});
            }
        });
	}else{
		logcheck = true;
		res.redirect('/');
  	}
});
router.get('/deviceAdd', (req, res, next)=>{
	if(req.session.user_id == 'admin'){
        req.session.now = (new Date()).toUTCString();
		res.render('deviceAdd');
	}else{
		logcheck = true;
		res.redirect('/');
  	}
});
router.get('/deviceEdit', (req, res, next)=>{
	if(req.session.user_id == 'admin'){
        client.query('SELECT * FROM device WHERE deviceNumber = ?',[req.session.deviceNumber],(err,rows)=>{
            if(err) {console.log(err);}
            if(!rows.length){
                logcheck = true;
                res.redirect('/');
            }else{
                req.session.now = (new Date()).toUTCString();
                res.render('deviceEdit',
                           {deviceNumber:rows[0].deviceNumber,
                            sort:rows[0].sort,
                            version:rows[0].version,
                            ipv4_address:rows[0].ipv4_address,
                            ipv6_address:rows[0].ipv6_address,
                            activated:rows[0].activated,
                            place:rows[0].place
                           }
                          );
            }
        });
	}else{
		logcheck = true;
		res.redirect('/');
  	}
});
router.get('/error', (req, res, next)=>{
  res.render('error');
});

router.post('/', function(request,response) {
	var body = request.body;	
	
	if(body.id == 'admin'){
		fs.readFile('settings.conf','utf8',function(error,read){
			var enc = crypto.createCipher('aes192',key);
			var encpass = enc.update(body.password,'utf8','base64');
			encpass += enc.final('base64');
			if(read.toString() == encpass){
				request.session.user_id = 'admin';
				response.redirect('/admin');
			}
			else
			{
				response.redirect('/error');
			}
		});
	}
	else
	{
		client.query('SELECT * FROM medic WHERE id = ?',[body.id],(err,rows)=>{
			if(!rows.length){
				response.redirect('/error');
			}else{
				var enc = crypto.createCipher('aes192',key);
				var encpass = enc.update(body.password,'utf8','base64');
				encpass += enc.final('base64');
				if(encpass == rows[0].password){
					request.session.user_id = rows[0].id;
					response.redirect('/medic');
				}else{
					response.redirect('/error');	
				}
			}
		});
	}
});
router.post('/admin', function(request,response) {
	response.redirect('/adminpass');	
});
router.post('/adminpass', function(request,response) {
	var body = request.body;
	fs.readFile('settings.conf','utf8',function(error,read){
		var check = crypto.createCipher('aes192',key);
		var checkpass = check.update(body.check,'utf8','base64');
		checkpass += check.final('base64');
		if(read.toString() != checkpass){
			response.redirect('/error');
		}
		else if(body.password == body.passwordcheck){
			var enc = crypto.createCipher('aes192',key);
			var encpass = enc.update(body.password,'utf8','base64');
			encpass += enc.final('base64');
			fs.writeFile('settings.conf',encpass,'utf8');
			response.redirect('/admin');
		}else{
			response.redirect('/error');	
		}
	});
});
router.post('/medic', function(request,response) {
	response.redirect('/changemedic');
});
router.post('/changemedic', function(request,response) {
	var body = request.body;
	client.query('SELECT * FROM medic WHERE id = ?',[request.session.user_id],(err,rows)=>{
		if(!rows.length){
			response.redirect('/error');
		}else{
			var check = crypto.createCipher('aes192',key);
			var checkpass = check.update(body.check,'utf8','base64');
			checkpass += check.final('base64');
			if(checkpass == rows[0].password){
				if(body.password == body.passwordcheck){
					var enc = crypto.createCipher('aes192',key);
					var encpass = enc.update(body.password,'utf8','base64');
					encpass += enc.final('base64');
					client.query('UPDATE medic SET employeeNumber=?, id=?, password=?, belong=?, contact=?, address=?, birth=? WHERE id=?',[body.employeeNumber,body.id,encpass,body.belong,body.contact,body.address,body.birth,request.session.user_id]);
					request.session.user_id = body.id;
					response.redirect('/medic');
				}else{
					response.redirect('/error');	
				}
			}else{
				response.redirect('/error');	
			}
		}
	});
});
router.post('/deviceAdd', function(request,response) {
	var body = request.body;
	client.query('INSERT INTO device(deviceNumber,sort,version,ipv4_address,ipv6_address,activated,place) VALUES (?,?,?,?,?,?,?)',[body.deviceNumber,body.sort,body.version,body.ipv4_address,body.ipv6_address,body.activated,body.place],(err,rows)=>{
        if(err) {console.log(err);}
		response.redirect('/devicemanager');
	});
});
router.post('/devicemanager', function(request,response) {
	var body = request.body;
	request.session.deviceNumber = body.deviceNumber;
    if(body.type == "edit"){
        response.redirect('/deviceEdit');
    }else if(body.type == "delete"){
        client.query('DELETE FROM device WHERE deviceNumber = ?',[request.session.deviceNumber]);
        response.redirect('/devicemanager');
    }
});
router.post('/deviceEdit', function(request,response) {
	var body = request.body;
    client.query('UPDATE device SET deviceNumber=?, sort=?, version=?, ipv4_address=?, ipv6_address=?, activated=?, place=? WHERE deviceNumber=?',[body.deviceNumber,body.sort,body.version,body.ipv4_address,body.ipv6_address,body.activated,body.place,request.session.deviceNumber]);
	response.redirect('/devicemanager');
});
module.exports = router;
