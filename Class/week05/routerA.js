const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next){
	console.log('Time : ', Date.now());
	next();
});

router.get('/', (req, res)=>{
	console.log("router.get() invoked");
	res.send('router A/ page');
});

router.get('/about', (req, res)=>{
	console.log("router.get() invoked");
	res.send('router A/about page');
});

module.exports = router;
