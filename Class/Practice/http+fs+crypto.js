const fs = require('fs');
const http = require('http');
const crypto = require('crypto');

const key = "key";

var server = http.createServer((req, res) => {
    if (req.method == 'GET') {
        if (req.url == '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            fs.readFile('send_data.html', 'utf8', (err, data) => {
                res.end(data);
            })
        } else if (req.url == '/result_crypto') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            fs.readFile('text.txt', 'utf8', (err, data) => {
                res.end(data);
            })

        } else if (req.url == '/result_decrypto') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            var decipher = crypto.createDecipher('aes192', key);
            fs.readFile('text.txt', 'utf8', (err, data) => {
                decipher.update(data, 'base64', 'utf8');
                res.end(decipher.final('utf8'));
            });
        }else {
            res.writeHead(500, {
                'Content-Type':'text/plain'
            });
            res.end('Sorry, we are done.');
        }
    } else if (req.method == 'POST') {
        if (req.url == '/') {
            var cipher = crypto.createCipher('aes192', key);
            req.on('data', (data)=>{
                cipher.update(data, 'utf8', 'base64');
                fs.writeFileSync('text.txt', cipher.final('base64'), 'utf8');
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('crypted');
            });
        }
    }
}).listen(65001, () => {
    console.log('server is on 127.0.0.1:65001');
})