const fs = require("fs");

var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
for(var i=0;i<Object.keys(users).length;i++){
  if(users[Object.keys(users)[i]].tokens)
    console.log(users[Object.keys(users)[i]].name);
}

console.log(users)

// const rj = require("r-json");
// var users = require("./users.json")//rj(__dirname+"/users.json");
// console.log(users);