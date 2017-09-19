process.argv.forEach(function(item, index){
	console.log(index + ":" + typeof(item) + ":" + item);
	if(item == '--exit'){
		let timeOut=Number(process.argv[index+1]);
		setTimeout(function(){
			process.exit();
		}, timeOut);
	}
});
