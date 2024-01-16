const express = require('express');
const app = express();
const http = require('http');
var fs = require('fs');
var json = require('jsonfile');
const config = require("./config.json");
const usrdb = "./users.json";
const usr = require("./users.json");

module.exports = (message, client, args) => {
  
  if(message.author.bot)
    return 1;
  if(!usr[message.author.id])
  {
    usr[message.author.id] = {};
    usr[message.author.id].name = message.author.username;
    fs.writeFile(usrdb, JSON.stringify(usr), (err) => console.error);
  }
  if(!usr[message.author.id][message.guild.id])
  {
    usr[message.author.id][message.guild.id] = {};
    fs.writeFile(usrdb, JSON.stringify(usr), (err) => console.error);
  }
  
/*   if(message.content.startsWith(config.prefix + "points")) // LEGACY POINTS SYSTEM
  {
     if(!usr[message.author.id][message.guild.id].points)
    {    
      usr[message.author.id][message.guild.id].points = 0;
      fs.writeFile(usrdb, JSON.stringify(usr), (err) => console.error);
    } 
  }   */
  
  if(message.content.startsWith(config.prefix + "pc"))
  {
    //gset.forEach(
  }
};
