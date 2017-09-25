const readline = require('readline');
const crypto = require('crypto')
const fs = require('fs');

const r = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
const key = 'gachon654321';

if (process.argv[2] == '-store') {
	var cipher = crypto.createCipher('aes192', key);

	console.log("-------------------------------------");
	console.log("사이트정보 등록프로그램 v1.0(암호화저장)");
	console.log("-------------------------------------");

	var menu = ['사이트명: ', '인터넷주소: ', '아이디: ', '비밀번호: '];
	var content = ['', '', '', ''];
	var index = 0;
	const handlerForaLine = function (line) {
		content[index] = line;
		index++;
		if (index >= 4) {
			r.close();
			var cipheredOutput = cipher.update(content.toString(), 'utf8', 'base64');
			cipheredOutput += cipher.final('base64');

			fs.writeFileSync('siteinfo', cipheredOutput.toString(), 'utf8');
			console.log("암호화하여 siteinfo파일로 저장하였습니다.");
			process.exit();
		}
		r.setPrompt(menu[index]);
		r.prompt()
	}

	r.setPrompt(menu[index]);
	r.prompt();
	r.on('line', handlerForaLine);


} else if (process.argv[2] == '-restore') {

	console.log("-------------------------------------");
	console.log("사이트정보 조회프로그램 v1.0(복호화조회)");
	console.log("-------------------------------------");
	var decipher = crypto.createDecipher('aes192', key);
	fs.readFile('siteinfo', 'utf8', (error, readtext) => {
		var decipherOutput = decipher.update(readtext, 'base64', 'utf8');
		decipherOutput += decipher.final('utf8');
		var Output = decipherOutput.split(',');
		console.log("복호화하여 siteinfo파일에서 가져왔습니다.");
		console.log("사이트명: " + Output[0]);
		console.log("인터넷주소: " + Output[1]);
		console.log("아이디: " + Output[2]);
		console.log("비밀번호: " + Output[3]);

		process.exit();

	});
}
