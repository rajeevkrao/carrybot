const express = require('express');
const app = express();
const http = require('http');
var fs = require('fs');
var json = require('jsonfile');
const config = require("./config.json");
const usrdb = "./users.json";
const usr = require("./users.json");

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports = (message, client, args) => {
  
  if(message.author.bot)
    return 1;
  if(!usr[message.author.id])
  {
    usr[message.author.id] = {};
    usr[message.author.id].name = message.author.username;
    fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
  }
  if(!usr[message.author.id][message.guild.id])
  {
    usr[message.author.id][message.guild.id] = {};
    fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
  }
  if(!usr[message.author.id][message.guild.id].points)
  {    
     usr[message.author.id][message.guild.id].points = 0;
     fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
  }
  
  if(message.content.startsWith(config.prefix + "points"))
  {
    var dmsg;
    if (!args[0])
    {
      message.channel.send("You have scored " + usr[message.author.id][message.guild.id].points + " points").then(msg => {
        msg.delete({timeout:10000})
      });;
    }
    if(args[0])
    {
      var uid=message.mentions.users.first().id;
      var name=message.mentions.users.first().username;
      message.channel.send(name+" has scored "+usr[uid][message.guild.id].points+" points").then(msg => {
        msg.delete({timeout:10000})
      });
    }
    message.delete({timeout:5000});
    usr[message.author.id][message.guild.id].points--;
    fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
  }  
  
  var users = JSON.parse(fs.readFileSync('./point.json', 'utf8'));
  
  if(message.content.startsWith(users.code))
  {
    message.delete({timeout:1000});
    usr[message.author.id][message.guild.id].points+=10; 
    usr[message.author.id][message.guild.id].points--;
    fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
    message.channel.send("You have been rewarded with 10 points for using the unique code \nCheck your points by typing !points")
    message.channel.send("To find the next unique code visit https://carrybot.glitch.me/getthepoint/")
    users.code=makeid(8);
    fs.writeFileSync('./point.json', JSON.stringify(users), (err) => console.error);
  }
};