var sum=0;
const code=5;

console.time('runningTime');
for(var cnt=0; cnt<1000; cnt++){
	sum = sum + cnt;
}
console.timeEnd('runningTime');
console.log("Cycle : %d", cnt);
console.log("Cycle : ",cnt);
console.log(cnt);
console.log(`Cycle + Sum : ${cnt+sum}`);
console.log("%d, %s, %j,", sum, "and", {age: 24});
console.error('error#%d', code);
