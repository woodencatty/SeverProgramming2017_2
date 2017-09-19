const readline = require('readline');
const crypto = require('crypto')
const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output:process.stdout
});

var siteinfo = {
	sitename : '',
	URL : '',
	id : '',
	pwd : ''
};

if(process.argv[3] == '-store'){
var cipher = crypto.createCipher('aes192', key);
const key = 'gachon654321';
console.log("----------insert info------------");
	rl.question("sitename : ", (answer)=>{
		siteinfo.sitename = answer;
		rl.question("URL : http://", (answer)=>{
			siteinfo.URL = answer;
			rl.question("id : ", (answer)=>{
				siteinfo.id = answer;
				rl.question("pwd : ", (answer)=>{
					siteinfo.pwd = answer;
					chipher.update(siteinfo,'utf8','base64');
					var chipherOutput = chipher.final('base64');
					fs.writefile('siteinfo', chipherOutput, 'utf8', (error)=>{});
				});
			});
		});
	});

}else if(process.argv[3] == '-restore'){
var cryptoText;
var decryptoText;
const key = 'gachon654321';
var decipher = crypto.createDecipher('aes192',key);
fs.readFile('siteinfo', 'utf8', (error, readtext)=>{
	     cryptoText = readtext;
	     decipher.update(cryptoText, 'base64', 'utf8');
	     decryptoText = decipher.final('utf8');
	     console.log(decryptoText);
});
}
