const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")

const rj = require('r-json');
const wj = require('w-json');

var users = rj(__dirname+"/users.json");
for (const [user, servers] of Object.entries(users))
	for(const [server, data] of Object.entries(servers))
	{
		if(server=="name")
			continue
		if(!fs.existsSync(__dirname+"/users"))
			fs.mkdirSync(__dirname+"/users")
		if(!fs.existsSync(__dirname+`/users/${user}`))
			fs.mkdirSync(__dirname+`/users/${user}`)
		if(!fs.existsSync(__dirname+`/users/${user}/${server}`))
			fs.mkdirSync(__dirname+`/users/${user}/${server}`)
		wj(__dirname+`/users/${user}/${server}/points.json`,data)
	}
//wj(__dirname+"/users/")


	

	