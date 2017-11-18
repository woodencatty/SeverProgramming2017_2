const express = require('express');
const app = express();
const register = require('./routerA');
const login = require('./routerB');

app.use('/reg', register);
app.use('/log', login);

app.listen(52273, ()=>{
	console.log('Server is Running(52273)');
});
