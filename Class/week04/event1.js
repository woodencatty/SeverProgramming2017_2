const exitHandler = (code)=>{
	console.log('process is going down');
};

const exceptionHandle = (err)=>{
	console.log('exeption occured');
};

var count=0;

const TimeOut = ()=>{
	count = count+1;
	if(count>5){return;}
	setTimeout(TimeOut, 1000);
	king.god.SunKyu();
};

process.on('exit', exitHandler);
process.on('uncaughtException', exceptionHandle);
setTimeout(TimeOut, 1000);
