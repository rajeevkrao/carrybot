//finding total members in users.json

const fs = require('fs');

var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
console.log("\x1b[36m", Object.keys(users).length + " members data saved in users.json");
