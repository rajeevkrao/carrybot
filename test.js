console.log(process.env.DC_ID);

/* const Database = require("@replit/database")
const db = new Database()

const Test = require("./modules/mongodb.js")

db.get("MONGO_USER").then(user=>{
	db.get("MONGO_PASS").then(pass=>{
		main(user,pass);
	})
})

function main(user,pass){
let test = new Test({
	user:user,
	pass:pass
});

test.getUserPoints("").then(data=>{
	//console.log(data)
})


} */

/* const rj = require("r-json");
const wj = require("w-json");

var ori = rj(__dirname+"/users.json");

console.log(ori) */

/* for (const [key, value] of Object.entries(ori)){
	delete ori[key].name;
}

wj(__dirname+"/users.json", ori)  */

/* var ori = rj(__dirname+"/users.json");
var exr = rj(__dirname+"/temp.json");

ori = {
	...exr,
	...ori
}

wj(__dirname+"/users.json", ori) */