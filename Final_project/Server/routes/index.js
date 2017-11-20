const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');

var key = 'secret';

const client = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'gachon654321',
	database: 'project'
});


router.get('/', (req, res, next)=>{
  res.render('login');
	
});
router.get('/init', (req, res, next)=>{
	var enc = crypto.createCipher('aes192',key);
	var encpass = enc.update('1234','utf8','base64');
	encpass += enc.final('base64');
	fs.writeFile('settings.conf',encpass,'utf8');
	client.query('INSERT INTO medic (employeeNumber, id, password, belong, contact, address, birth) VALUES (?,?,?,?,?,?,?)',['1','medic',encpass,'신경과','010-1234-5678','한국어딘가','1994/12/28'],()=>{
		response.render('login');
	});	

});
router.get('/admin', (req, res, next)=>{
	if(req.session.user_id == 'admin'){
		req.session.now = (new Date()).toUTCString();
		res.render('admin',{id:req.session.user_id});
	}else{
		res.render('loginerror');
  	}
});
router.get('/medic', (req, res, next)=>{
	client.query('SELECT * FROM medic WHERE id = ?',[req.session.user_id],(err,rows)=>{
		if(!rows.length){
			res.render('loginerror');
		}else{
			req.session.now = (new Date()).toUTCString();
			res.render('medic',{id:req.session.user_id});
		}
	});
});
router.get('/adminpass', (req, res, next)=>{
	if(req.session.user_id == 'admin'){
		req.session.now = (new Date()).toUTCString();
		res.render('adminpass');
	}else{
		res.render('loginerror');
  	}
});
router.get('/changemedic', (req, res, next)=>{
	req.session.now = (new Date()).toUTCString();
  res.render('changemedic');
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
			console.log('1');
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
					console.log('1=2');
				}
			}else{
				response.redirect('/error');	
				console.log('1=');
			}
		}
	});
	
});
module.exports = router;
