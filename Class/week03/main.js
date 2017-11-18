const myModule=require('./module_a.js');
var value=0;

myModule.set(35);
value=myModule.get();
console.log("Value : %d", value);
console.log(myModule);

