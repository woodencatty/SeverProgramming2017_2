console.time('running time is');

console.log("=== information===");
process.argv.forEach(function(item, index){
	if(item == '-name'){
		console.log("Name : " + process.argv[index + 1] + "\n");
	}
	if(item == '-age'){
		console.log("Age : " + process.argv[index + 1] + "\n");
	}
	if(item == '-tel'){
		console.log("tel : " + process.argv[index + 1] + "\n");
	}
});
console.log("---------------------");

console.timeEnd('running time is');
console.log(' death.');
