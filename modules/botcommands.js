//commands to repair databases
const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("../config.json");

var gsetfile = "../guilds.json";
const gset = require(gsetfile);

module.exports = (message, client) => {
 /* 
  const ownerarr = config.owner;
  var allow=0;
  ownerarr.forEach(function(element) {

    if(message.author.id == element)
    {
      allow=1;
    } 
  });
  if(!allow)
    return;
  */
  //=====commands
  
  if(message.content.startsWith(config.prefix + "updatesinfo"))
  {
      client.guilds.forEach(guild=>{
        var gid=guild.id;
        if(!gset[guild.id])
          gset[guild.id]={};
          fs.writeFileSync(gsetfile, JSON.stringify(gset), (err) => console.error);
          message.channel.send("Info of "+ guild.name +" has been updated");
      })
      
  }
};