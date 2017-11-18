const fs = require('fs');

let character 

exports.init = ()=>{
	character = {
		power : 30,
		energy : 30
		};
}

exports.print = ()=>{
	console.log("!!Status - power : "+ character.power + " energy : "+ character.energy+ " !!");
}

exports.eat = ()=>{
	if(character.power < 1000){
		if(character.energy > 1){
			character.power --;
			character.energy ++;
		}else {console.log("not enough energy");}
	}else {console.log("too much power");}
console.log("eat");
}

exports.sleep = ()=>{
	if(character.power > 1){
		if(character.energy > 1){
			character.power --;
			character.energy --;
		}else {console.log("not enough energy");}
	}else {console.log("need more power");}
console.log("sleep");
}

exports.exercise = ()=>{
	if(character.power < 1000){
		if(character.energy > 1){
			character.power ++;
			character.energy --;
		}else {console.log("not enough energy");}
	}else {console.log("too much power");}
console.log("exercise");
}

exports.save = ()=>{
let text = "!!Status - power : "+ character.power + " energy : "+ character.energy+ " !!";
fs.writeFile('avatar.txt', text, 'utf8', (error)=>{});
console.log("save");
}

