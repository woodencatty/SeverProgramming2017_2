const express = require('express');

const app = express();

app.use((request, response, next)=>{
	let name = request.query.name;
	let region = request.query.region;
	const agent = request.header('User-Agent');
	
	console.log(request.headers);
	if(agent.toLowerCase().match(/firefox/)){
		response.status(200).send('<h2> Browser:firefox <br />' + name + ':'+region+'</h2>');
	}else if(agent.toLowerCase().match(/chrome/)){
		response.status(200).send('<h2> Browser:chrome <br />' + name + ':'+region+'</h2>');
	}else {
		response.status(500).send('<h2> Browser:Others <br />' + name + ':'+region+'</h2>');
	}
});

app.listen(52273, ()=>{
	console.log('Sever is running (52273)');
});
