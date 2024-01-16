/*
	This is a module for running commands for owner of this bot
*/
const rj = require("r-json");
const wj = require("w-json");

const config = require("./config.json");

module.exports =(message, client) => {
	const args = message.content.split(" ");

	const ownerarr = config.owner;
  var oa=0;  
  ownerarr.forEach(function(element) {

    if(message.author.id == element)
      oa=1; 
  });
	if(oa){
		if(message.content.startsWith("mc")){
			if(!isNaN(Number(args[1]))){
				var mclist = rj(__dirname+"/mclist.json")
				mclist.port = args[1];
				wj(__dirname+"/mclist.json",mclist)
			}
			if(args[1]=="inform"){
				var mclist = rj(__dirname+"/mclist.json")
				mclist.members.forEach((member)=>{
					client.users.cache.get(member).send("Minecraft Server Ip ->")
					.then(msg=>{
						console.log(msg.channel.recipient.username)
					})
					.catch(console.error)
					client.users.cache.get(member).send(mclist.prefix+mclist.port)
					.catch(console.error)
				})
			}
		}

		if(message.content.startsWith("pubg")){
			if(args[1]==""){
				!isNaN(Number(args[1]))
				var mclist = rj(__dirname+"/mclist.json")
				mclist.port = args[1];
				wj(__dirname+"/mclist.json",mclist)
			}
			if(args[1]=="inform"){
				var mclist = rj(__dirname+"/mclist.json")
				mclist.members.forEach((member)=>{
					client.users.cache.get(member).send("Minecraft Server Ip ->")
					.then(msg=>{
						console.log(msg.channel.recipient.username)
					})
					.catch(console.error)
					client.users.cache.get(member).send(mclist.prefix+mclist.port)
					.catch(console.error)
				})
			}
		}
	}
	


}