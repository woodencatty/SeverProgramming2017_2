const avar=require('./avartar.js');
const engine=require('./engine');

console.log("before exercise power:", avar.power);
avar.run();
console.log("after exercise power:", avar.power);

console.log(engine.b);
console.log(engine.c());
