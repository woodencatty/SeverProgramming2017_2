const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const http = require('http');

var key = 'secret';
var logcheck = false;
var dbcheck = false;
var deletecheck = false;
var errcheck = false;
var openingcheck = false;
var closingcheck = false;

const client = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'Tues_8team',
    password: 'gachon654321',
    database: 'Tues_8team'
});

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
                        client.query('SELECT activated FROM device WHERE deviceNumber = ?', [request.headers.apd_id], (err, rows) => {
                        });
                    } 
                });
            } else if (request.url == '/patient/exercise') {
                console.log(request.headers.idd_id);
                client.query('SELECT * FROM patient WHERE deviceNumber = ?', [request.headers.idd_id], (err, rows) => {
                    console.log(err);
                    console.log(rows);
                    if (!rows.length) {
                        console.log("DB query Error!");
                        response.writeHead(404);
                        response.end();
                    } else {
                        let previous_data = rows[0].exercise.toString().split(',');
                        let update_data = ""
                        response.writeHead(200);
                        response.end(previous_data[0]); //보내는 부분. 가공이 필요함.
                        if(previous_data[0] == "end"){
                            update_data == "end";
                        }else{
                            for (let i = 1; i < previous_data.length; i++) {
                                update_data += (previous_data[i] + ",");
                                if (i == previous_data.length - 1) {
                                    update_data += previous_data[i];
                                }
                            }
                        }
                        client.query('UPDATE patient SET exercise=?, WHERE deviceNumber=?', [update_data, request.headers.idd_id]);                        
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
                client.query('INSERT INTO error (apd_id, date, err) VALUES (?,?,?)', [request.headers.apd_id, Date.now(), request.headers.sys_error], (err) => {
                    if (err) {
                        console.log(err);
                        console.log("DB query Error!");
                        response.writeHead(404);
                        response.end();
                    } else {
                        console.log("SUCCESS");
                        response.writeHead(200);
                        response.end();
                    }
                });
            }
            if (request.url == '/patient/exercise') {
                var exercise_arr = request.headers.exercise.split(']');
                exercise_arr.forEach((element) => {
                    console.log(element);
                    //exercise_arr[element] = exercise_arr[element].toString().split(',');
                }, this);
                exercise_arr.forEach(function (element) {
                    client.query('INSERT INTO exercise (idd_id, date, exercise) VALUES (?,?,?)', [request.headers.idd_id, element[1], element[0]], (err) => {
                        if (err) {
                            console.log(err);
                            console.log("DB query Error!");
                            response.writeHead(404);
                            response.end();
                        } else {
                            console.log("SUCCESS");
                            response.writeHead(200);
                            response.end();
                        }
                    });
                }, this);
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



router.get('/', (req, res, next) => {
    if (logcheck) {
        console.log(logcheck);
        res.render('login', {
            logincheck: true
        });
        logcheck = false;
    } else {
        res.render('login', {
            logincheck: false
        });
    }
});
router.get('/init', (req, res, next) => {
    var enc = crypto.createCipher('aes192', key);
    var encpass = enc.update('1234', 'utf8', 'base64');
    encpass += enc.final('base64');
    fs.writeFile('settings.conf', encpass, 'utf8');
    client.query('INSERT INTO medic (employeeNumber, name, id, password, belong, contact, address, birth) VALUES (?,?,?,?,?,?,?,?)', ['1', '김선규', 'medic', encpass, '한글', '010-1234-5678', 'fff', '1994/12/28'], (err) => {
        if (err) {
            console.log(err);
        }
    });
});
router.get('/init2', (req, res, next) => {
    client.query('INSERT INTO device (deviceNumber, version, sort, activated, ipv4_address, ipv6_address, place) VALUES (?,?,?,?,?,?,?)', ['1', '1.0', 'cc', true, '200.1.1.1', '200.1.1.1', 'home'], (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});
router.get('/init3', (req, res, next) => {
    client.query('INSERT INTO patient (patientNumber, patientName, disease, status, exercise, deviceNumber) VALUES (?,?,?,?,?,?)', ['1', '안정욱', 'mers', 'bad', '50', '1'], (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});
router.get('/admin', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        req.session.now = (new Date()).toUTCString();
        res.render('home_manager', {
            id: req.session.user_id
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/medic', (req, res, next) => {
    client.query('SELECT * FROM medic WHERE id = ?', [req.session.user_id], (err, rows) => {
        if (!rows.length) {
            logcheck = true;
            res.redirect('/');
        } else {
            req.session.now = (new Date()).toUTCString();
            res.render('home_doctor', {
                id: req.session.user_name
            });
        }
    });
});
router.get('/adminpass', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        req.session.now = (new Date()).toUTCString();
        res.render('adminpass');
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/changemedic', (req, res, next) => {
    client.query('SELECT * FROM medic WHERE id = ?', [req.session.user_id], (err, rows) => {
        if (!rows.length) {
            logcheck = true;
            res.redirect('/');
        } else {
            req.session.now = (new Date()).toUTCString();
            res.render('changemedic');
        }
    });
});
router.get('/devicemanager', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        req.session.now = (new Date()).toUTCString();
        var echeck = false;
        var dcheck = false;
        if (deletecheck) {
            dcheck = true;
            deletecheck = false;
        }
        if (errcheck) {
            echeck = true;
            errcheck = false;
        }
        client.query('SELECT * FROM device', (err, rows) => {
            req.session.now = (new Date()).toUTCString();
            res.render('device_manage', {
                name: req.session.user_name,
                data: rows,
                deletecheck: dcheck,
                errcheck: echeck
            });
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/deviceAdd', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        var check = false;
        if (dbcheck) {
            check = true;
            dbcheck = false;
        }
        req.session.now = (new Date()).toUTCString();
        res.render('add_device', {
            name: req.session.user_name,
            dbcheck: check
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/deviceEdit', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        var check = false;
        var echeck = false;
        if (dbcheck) {
            check = true;
            dbcheck = false;
        }
        if (errcheck) {
            echeck = true;
            errcheck = false;
        }
        client.query('SELECT * FROM device WHERE deviceNumber = ?', [req.session.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
            if (!rows.length) {
                logcheck = true;
                res.redirect('/');
            } else {
                req.session.now = (new Date()).toUTCString();
                res.render('edit_device', {
                    name: req.session.user_name,
                    deviceNumber: rows[0].deviceNumber,
                    sort: rows[0].sort,
                    version: rows[0].version,
                    ipv4_address: rows[0].ipv4_address,
                    ipv6_address: rows[0].ipv6_address,
                    place: rows[0].place,
                    dbcheck: check,
                    errcheck: echeck
                });
            }
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/doctor_manage', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        req.session.now = (new Date()).toUTCString();
        client.query('SELECT * FROM medic', (err, rows) => {
            req.session.now = (new Date()).toUTCString();
            res.render('doctor_manage', {
                name: req.session.user_name,
                data: rows
            });
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/doctor_add', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        var check = false;
        if (dbcheck) {
            check = true;
            dbcheck = false;
        }
        req.session.now = (new Date()).toUTCString();
        res.render('add_doctor', {
            name: req.session.user_name,
            dbcheck: check
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/doctor_edit', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        var check = false;
        if (dbcheck) {
            check = true;
            dbcheck = false;
        }
        client.query('SELECT * FROM medic WHERE employeeNumber = ?', [req.session.employeeNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
            if (!rows.length) {
                logcheck = true;
                res.redirect('/');
            } else {
                req.session.now = (new Date()).toUTCString();
                var dec = crypto.createDecipher('aes192', key);
                var decpass = dec.update(rows[0].password, 'base64', 'utf8');
                decpass += dec.final('utf8');
                res.render('edit_doctor', {
                    name: req.session.user_name,
                    employeeNumber: rows[0].employeeNumber,
                    id: rows[0].id,
                    password: decpass,
                    name: rows[0].name,
                    belong: rows[0].belong,
                    contact: rows[0].contact,
                    address: rows[0].address,
                    birth: rows[0].birth,
                    dbcheck: check
                });
            }
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});
router.get('/man_opening', (req, res, next) => {
    if (req.session.user_id == 'admin') {
        var ocheck = false;
        if (openingcheck) {
            ocheck = true;
            openingcheck = false;
        }
        var ccheck = false;
        if (closingcheck) {
            ccheck = true;
            closingcheck = false;
        }
        client.query('SELECT * FROM device', (err, rows) => {
            req.session.now = (new Date()).toUTCString();
            res.render('man_opening', {
                name: req.session.user_name,
                data: rows,
                openingcheck: ocheck,
                closingcheck: ccheck
            });
        });
    } else {
        logcheck = true;
        res.redirect('/');
    }
});

router.get('/patient_manage', (req, res, next) => {
    client.query('SELECT * FROM medic WHERE id = ?', [req.session.user_id], (err, rows) => {
        if (!rows.length) {
            logcheck = true;
            res.redirect('/');
        } else {
            client.query('SELECT * FROM patient', (err, rows) => {
                req.session.now = (new Date()).toUTCString();
                res.render('patient_manage', {
                    name: req.session.user_name,
                    data: rows
                });
            });
        }
    });
});
router.get('/patient_add', (req, res, next) => {
    client.query('SELECT * FROM medic WHERE id = ?', [req.session.user_id], (err, rows) => {
        if (!rows.length) {
            logcheck = true;
            res.redirect('/');
        } else {
            var check = false;
            if (dbcheck) {
                check = true;
                dbcheck = false;
            }
            req.session.now = (new Date()).toUTCString();
            res.render('add_patient', {
                name: req.session.user_name,
                dbcheck: check
            });
        }
    });
});
router.get('/patient_edit', (req, res, next) => {
    client.query('SELECT * FROM medic WHERE id = ?', [req.session.user_id], (err, rows) => {
        if (!rows.length) {
            logcheck = true;
            res.redirect('/');
        } else {
            var check = false;
            if (dbcheck) {
                check = true;
                dbcheck = false;
            }
            client.query('SELECT * FROM patient WHERE patientNumber = ?', [req.session.patientNumber], (err, rows) => {
                if (err) {
                    console.log(err);
                }
                if (!rows.length) {
                    logcheck = true;
                    res.redirect('/');
                } else {
                    req.session.now = (new Date()).toUTCString();
                    res.render('edit_patient', {
                        name: req.session.user_name,
                        patientNumber: rows[0].patientNumber,
                        patientName: rows[0].patientName,
                        disease: rows[0].disease,
                        status: rows[0].status,
                        dbcheck: check
                    });
                }
            });
        }
    });
});
router.get('/doctor_opening', (req, res, next) => {
    client.query('SELECT * FROM medic WHERE id = ?', [req.session.user_id], (err, rows) => {
        if (!rows.length) {
            logcheck = true;
            res.redirect('/');
        } else {
            var ccheck = false;
            if (closingcheck) {
                ccheck = true;
                closingcheck = false;
            }
            client.query('SELECT * FROM device', (err, rows) => {
                req.session.now = (new Date()).toUTCString();
                res.render('doctor_opening', {
                    name: req.session.user_name,
                    data: rows,
                    closingcheck: ccheck
                });
            });
        }
    });
});
router.get('/doctor_opening_add', (req, res, next) => {
    client.query('SELECT * FROM medic WHERE id = ?', [req.session.user_id], (err, rows) => {
        if (!rows.length) {
            logcheck = true;
            res.redirect('/');
        } else {
            var check = false;
            if (dbcheck) {
                check = true;
                dbcheck = false;
            }
            res.render('doctor_opening_add', {
                dbcheck: check,
                deviceNumber: req.session.deviceNumber
            });
        }
    });
});
router.get('/error', (req, res, next) => {
    res.render('error');
});

router.post('/', function (request, response) {
    var body = request.body;

    if (body.id == 'admin') {
        fs.readFile('settings.conf', 'utf8', function (error, read) {
            var enc = crypto.createCipher('aes192', key);
            var encpass = enc.update(body.password, 'utf8', 'base64');
            encpass += enc.final('base64');
            if (read.toString() == encpass) {
                request.session.user_id = 'admin';
                request.session.user_name = 'admin';
                response.redirect('/admin');
            } else {
                response.redirect('/error');
            }
        });
    } else {
        client.query('SELECT * FROM medic WHERE id = ?', [body.id], (err, rows) => {
            if (!rows.length) {
                response.redirect('/error');
            } else {
                var enc = crypto.createCipher('aes192', key);
                var encpass = enc.update(body.password, 'utf8', 'base64');
                encpass += enc.final('base64');
                if (encpass == rows[0].password) {
                    request.session.user_id = rows[0].id;
                    request.session.user_name = rows[0].name;
                    response.redirect('/medic');
                } else {
                    response.redirect('/error');
                }
            }
        });
    }
});
router.post('/admin', function (request, response) {
    response.redirect('/adminpass');
});
router.post('/adminpass', function (request, response) {
    var body = request.body;
    fs.readFile('settings.conf', 'utf8', function (error, read) {
        var check = crypto.createCipher('aes192', key);
        var checkpass = check.update(body.check, 'utf8', 'base64');
        checkpass += check.final('base64');
        if (read.toString() != checkpass) {
            response.redirect('/error');
        } else if (body.password == body.passwordcheck) {
            var enc = crypto.createCipher('aes192', key);
            var encpass = enc.update(body.password, 'utf8', 'base64');
            encpass += enc.final('base64');
            fs.writeFile('settings.conf', encpass, 'utf8');
            response.redirect('/admin');
        } else {
            response.redirect('/error');
        }
    });
});
router.post('/medic', function (request, response) {
    response.redirect('/changemedic');
});
router.post('/changemedic', function (request, response) {
    var body = request.body;
    client.query('SELECT * FROM medic WHERE id = ?', [request.session.user_id], (err, rows) => {
        if (!rows.length) {
            response.redirect('/error');
        } else {
            var check = crypto.createCipher('aes192', key);
            var checkpass = check.update(body.check, 'utf8', 'base64');
            checkpass += check.final('base64');
            if (checkpass == rows[0].password) {
                if (body.password == body.passwordcheck) {
                    var enc = crypto.createCipher('aes192', key);
                    var encpass = enc.update(body.password, 'utf8', 'base64');
                    encpass += enc.final('base64');
                    client.query('UPDATE medic SET employeeNumber=?, id=?, password=?, name = ?, belong=?, contact=?, address=?, birth=? WHERE id=?', [body.employeeNumber, body.id, encpass, body.name, body.belong, body.contact, body.address, body.birth, request.session.user_id]);
                    request.session.user_id = body.id;
                    response.redirect('/medic');
                } else {
                    response.redirect('/error');
                }
            } else {
                response.redirect('/error');
            }
        }
    });
});
router.post('/deviceAdd', function (request, response) {
    var body = request.body;
    if (body.deviceNumber != '' && body.sort != '' && body.version != '') {
        client.query('INSERT INTO device(deviceNumber,sort,version,ipv4_address,ipv6_address,activated,place) VALUES (?,?,?,?,?,?,?)', [body.deviceNumber, body.sort, body.version, body.ipv4_address, body.ipv6_address, false, body.place], (err, rows) => {
            if (err) {
                console.log(err);
            }
            response.redirect('/devicemanager');
        });
    } else {
        dbcheck = true;
        response.redirect('/deviceAdd');
    }
});
router.post('/devicemanager', function (request, response) {
    var body = request.body;
    request.session.deviceNumber = body.deviceNumber;
    if (body.type == "edit") {
        response.redirect('/deviceEdit');
    } else if (body.type == "delete") {
        client.query('DELETE FROM device WHERE deviceNumber = ?', [request.session.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
                errcheck = true;
            }
            deletecheck = true;
            response.redirect('/devicemanager');
        });
    }
});
router.post('/deviceEdit', function (request, response) {
    var body = request.body;
    if (body.deviceNumber != '' && body.sort != '' && body.version != '') {
        client.query('UPDATE device SET deviceNumber=?, sort=?, version=?, ipv4_address=?, ipv6_address=?, activated=?, place=? WHERE deviceNumber=?', [body.deviceNumber, body.sort, body.version, body.ipv4_address, body.ipv6_address, false, body.place, request.session.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
                errcheck = true;
            }
            if (errcheck) {
                response.redirect('/deviceEdit');
            } else {
                request.session.deviceNumber = null;
                response.redirect('/devicemanager');
            }
        });
    } else {
        dbcheck = true;
        response.redirect('/deviceEdit');
    }
});
router.post('/doctor_add', function (request, response) {
    var body = request.body;
    console.log(body);
    if (body.employeeNumber != '' && body.id != '' && body.password != '' && body.name != '' && body.belong != '' && body.contact != '' && body.address != '' && body.birth != '' && body.id != 'admin') {
        var enc = crypto.createCipher('aes192', key);
        var encpass = enc.update(body.password, 'utf8', 'base64');
        encpass += enc.final('base64');
        client.query('INSERT INTO medic(employeeNumber,id,password,name,belong,contact,address,birth) VALUES (?,?,?,?,?,?,?,?)', [body.employeeNumber, body.id, encpass, body.name, body.belong, body.contact, body.address, body.birth], (err, rows) => {
            if (err) {
                console.log(err);
            }
            response.redirect('/doctor_manage');
        });
    } else {
        dbcheck = true;
        response.redirect('/doctor_add');
    }
});
router.post('/doctor_manage', function (request, response) {
    var body = request.body;
    if (body.type == "edit") {
        request.session.employeeNumber = body.employeeNumber;
        response.redirect('/doctor_edit');
    } else if (body.type == "delete") {
        client.query('DELETE FROM medic WHERE employeeNumber = ?', [body.employeeNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
            response.redirect('/doctor_manage');
        });
    }
});
router.post('/doctor_edit', function (request, response) {
    var body = request.body;
    if (body.employeeNumber != '' && body.id != '' && body.password != '' && body.name != '' && body.belong != '' && body.contact != '' && body.address != '' && body.birth != '' && body.id != 'admin') {
        var enc = crypto.createCipher('aes192', key);
        var encpass = enc.update(body.password, 'utf8', 'base64');
        encpass += enc.final('base64');
        client.query('UPDATE medic SET employeeNumber=?, id=?, password=?, name=?, belong=?, contact=?, address=? , birth=? WHERE employeeNumber=?', [body.employeeNumber, body.id, encpass, body.name, body.belong, body.contact, body.address, body.birth, request.session.employeeNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
            request.session.employeeNumber = null;
            response.redirect('/doctor_manage');
        });
    } else {
        dbcheck = true;
        response.redirect('/doctor_edit');
    }
});
router.post('/man_opening', function (request, response) {
    var body = request.body;
    if (body.type == "opening") {
        client.query('UPDATE device SET activated=true WHERE deviceNumber=?', [body.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
            openingcheck = true;
            response.redirect('/man_opening');
        });
    } else if (body.type == "closing") {
        client.query('UPDATE device SET activated=false WHERE deviceNumber=?', [body.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
            closingcheck = true;
            response.redirect('/man_opening');
        });
    }
});
router.post('/patient_manage', function (request, response) {
    var body = request.body;
    if (body.type == "edit") {
        request.session.patientNumber = body.patientNumber;
        response.redirect('/patient_edit');
    } else if (body.type == "delete") {
        client.query('DELETE FROM patient WHERE patientNumber = ?', [body.patientNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
            response.redirect('/patient_manage');
        });
    }
});
router.post('/patient_add', function (request, response) {
    var body = request.body;
    if (body.patientNumber != '' && body.patientName != '' && body.disease != '' && body.status != '') {
        client.query('INSERT INTO patient (patientNumber,patientName,disease,status,exercise) VALUES (?,?,?,?)', [body.patientNumber, body.patientName, body.disease, body.status, body.exercise], (err, rows) => {
            if (err) {
                console.log(err);
            }
            response.redirect('/patient_manage');
        });
    } else {
        dbcheck = true;
        response.redirect('/patient_add');
    }
});
router.post('/patient_edit', function (request, response) {
    var body = request.body;
    if (body.patientNumber != '' && body.patientName != '' && body.disease != '' && body.status != '') {
        client.query('UPDATE patient SET patientNumber=?, patientName=?, disease=?, status=? WHERE patientNumber=?', [body.patientNumber, body.patientName, body.disease, body.status, request.session.patientNumber]);
        request.session.patientNumber = null;
        response.redirect('/patient_manage');
    } else {
        dbcheck = true;
        response.redirect('/patient_edit');
    }
});
router.post('/doctor_opening', function (request, response) {
    var body = request.body;
    if (body.type == "opening") {
        request.session.deviceNumber = body.deviceNumber;
        console.log(request.session.deviceNumber);
        response.redirect('/doctor_opening_add');
    } else if (body.type == "closing") {
        client.query('UPDATE device SET activated=false WHERE deviceNumber=?', [body.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
        });
        client.query('UPDATE patient SET deviceNumber = null WHERE deviceNumber=?', [body.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
        });
        closingcheck = true;
        response.redirect('/doctor_opening');
    }
});
router.post('/doctor_opening_add', function (request, response) {
    var body = request.body;
    if (body.patientNumber != "") {
        client.query('UPDATE device SET activated=true WHERE deviceNumber=?', [body.deviceNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
        });
        client.query('UPDATE patient SET deviceNumber=? WHERE patientNumber=?', [body.deviceNumber, body.patientNumber], (err, rows) => {
            if (err) {
                console.log(err);
            }
        });
        response.redirect('/doctor_opening');
    } else {
        dbcheck = true;
        response.redirect('/doctor_opening_add');
    }
});
module.exports = router;
