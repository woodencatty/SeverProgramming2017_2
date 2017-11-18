const onUncaughtException = (error)=>{
	console.log('exception is occured');
	process.removeListener('uncaughtException', onUncaughtException);
};

	process.on('uncaughtException', onUncaughtException);

const timeOutHandler = ()=>{
	setTimeout(test, 2000);
	king.god.Sun.Kyu();
};
setTimeout(timeOutHandler, 2000);
