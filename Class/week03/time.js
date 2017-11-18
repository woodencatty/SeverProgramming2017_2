setTimeout(function(){ console.log("1sec");}, 1000);
setTimeout(function(){ console.log("2sec");}, 2000);
setTimeout(()=>{ console.log("3sec");}, 3000);
setTimeout(function(){ console.log("5sec");}, 5000);
setTimeout(function(){ console.log("7sec");}, 7000);
const id=setTimeout(()=>{console.log("will be canceled");}, 10000);
clearTimeout(id);
setInterval(()=>{console.log("4sec Interval");}, 4000);
