//DSCMDS - Discord Server CoMmanDS

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

var gsetfile = "./guilds.json";
const gset = require(gsetfile);

const config = require("./config.json");

module.exports = (message, client, args) => {
  if(args[0] == "unregister")
  {
    if(!gset[message.guild.id])
    {
      message.channel.send("You haven't registered this server.");
      return message.channel.send("Use !registerserver to register your server");
    }
    delete gset[message.guild.id];
    fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
    message.channel.send("Your Server has been successfully unregistered");
    return 1;
  }
  
  if(args[0] == "register")
  {
    if(gset[message.guild.id])
    {
        delete gset[message.guild.id].removed;
        fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
        return message.channel.send("This server is already registered");
    }
    gset[message.guild.id] = {};
    gset[message.guild.id].name = message.guild.name;
    fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
    message.channel.send("Server Registered in our database");
    return 1;
  }
  
  if(message.content === config.prefix + 'server')
  {
    message.delete(1000);
    fs.readFile('serverhelp.txt', 'utf8',(err, data) => 
    {
      if (err) throw err;
      message.author.send(data); 
    });
    return 1;
  }
  
  if(!gset[message.guild.id])
    return message.channel.send("You must register this server first to use this command \n type !server register");
      
  if(args[0] == "annchannel")
  {
    if(!gset[message.guild.id].ann_channel || gset[message.guild.id].ann_channel != message.channel.id)
    {
      gset[message.guild.id].ann_channel = message.channel.id;
      message.channel.send("This channel is setted as announce channel");
      fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
      return 1;
    }
    if(gset[message.guild.id].ann_channel == message.channel.id)
    {
      delete gset[message.guild.id].ann_channel;
      message.channel.send("No announce channel associated with this server");
      fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
      return 1;
    }
      
  }
  
  if(args[0] === "channel")
  {
    message.guild.createChannel(args[1], "text").then(channel => console.log(channel.id))
    fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);    
  }
  
  if(args[0] === "setinvitechannel")
  {
    if(!gset[message.guild.id].welcomer || gset[message.guild.id].welcomer != message.channel.id)
    {
    gset[message.guild.id].welcomer = {};
    gset[message.guild.id].welcomer.enabled=1;
      message.channel.send("This channel is setted as Welcome channel \n When a new member is added, I will notify members through this channel");
    fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
    }
  }
};
  
                