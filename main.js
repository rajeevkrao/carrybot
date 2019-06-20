const Discord = require("discord.js");
const client = new Discord.Client();

var express = require('express');
var app = express();

const request = require('request')
const body_parser = require('body-parser')
var appf = express().use(body_parser.json()); // creates express http server

const fs = require("fs");

var getIP = require('ipware')().get_ip;
const loc = require('iplocation');
//-----------------------------discord bot------------------------------------------------------------------------------

client.login(process.env.TOKEN);

//const db = require("./database.js");

const cmd = require("./commands.js");
const dmsg = require("./modules/dmsgs.js");
const react = require("./modules/reaction.js");
const sercup = require("./modules/servercount.js");

const rep = require("./reply.json");
const config = require("./config.json");

var gsetfile = "./guilds.json";
const gset = require(gsetfile);

const usrdb = "./users.json";
const usr = require(usrdb);

//const spam = require("./spam.js");

react(client);

client.on("guildCreate", guild => {
  console.log(client.user.username + " was added to " + guild.name + " by " + guild.owner.user.username)
  if(gset[guild.id])
  {
    delete gset[guild.id].removed
    fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
  }
  gset[guild.id] = {};
  gset[guild.id].name = guild.name;
  fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
  console.log("Server - " + guild.name + "is registered in our database");
  sercup(client);
  return 1;    
});

client.on("guildDelete", guild => {
  console.log(client.user.username + " is kicked/banned from " + guild.name)
  if(!gset[guild.id])
    return 1;
    gset[guild.id].removed = 1;
    fs.writeFile(gsetfile, JSON.stringify(gset), (err) => console.error);
    console.log("Server - " + guild.name + " has no connection between our database");
    sercup(client);
    return 1;
});

client.on("ready", () => {
  console.log("[SERVER]-->" + client.user.username + " is online in discord");
  client.user.setActivity('!helpme', { type: 'LISTENING' })
  sercup(client);
});

//reply
client.on("message", (message) => {
  if(message.guild === null)
  {
    dmsg(message,client);
    return 1;
  }
  if(rep.exact[message.content.toLowerCase()])
    return message.channel.send(rep.exact[message.content.toLowerCase()]); 
/* rep(starts).forEach(function(key){
    if(message.content.startsWith(key))
      return message.channel.send(starts[key]);*/
  if(rep.contains[message.content.toLowerCase()])
    return message.channel.send(rep.contains[message.content.toLowerCase()]); 
});

//commands
client.on("message", (message) => { 
  if(message.guild === null)
  { 
    return 1;
  }
  cmd(message,client);
});

client.on("message", (message) => { 
  if(message.guild === null)
  {
    return 1;
  }
  if(message.author.bot)
    return 1;
  if(!usr[message.author.id])
  {
    usr[message.author.id] = {};
    usr[message.author.id].name = message.author.username;
    fs.writeFile(usrdb, JSON.stringify(usr), (err) => console.error);
  }
  if(!usr[message.author.id][message.guild.id])
    usr[message.author.id][message.guild.id] = {};
  if(!usr[message.author.id][message.guild.id].points)
    usr[message.author.id][message.guild.id].points = 0;
  fs.writeFile(usrdb, JSON.stringify(usr), (err) => console.error);
  
  usr[message.author.id][message.guild.id].points++;
  fs.writeFile(usrdb, JSON.stringify(usr), (err) => console.error);
});

//to keep bot active 24x7
const http = require('http');
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

setInterval(() => {
  http.get(`http://b-hit.glitch.me/`);
}, 240000);
//-------------------------------website--------------------------------------------------------------------------

app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/discordbotinvite', function(request, response) {
  client.generateInvite(8).then(link => 
  response.redirect(link)
  );
                              
});

app.get('/about', function(request, response) {
  response.sendFile(__dirname + '/views/about.html');
});

app.get('/dil', function(request, response) { //DIL - Discord community Invite Link
  response.redirect('https://discord.gg/CktEevm');
});

app.get('/privacy', function(request, response) {
  response.sendFile(__dirname + '/views/privacy.html');
});

app.get('/getthepoint', function(request, response) {
  response.sendFile(__dirname + '/views/pointcode.html');
});

app.get('/testing', function(request, response) {
  response.sendFile(__dirname + '/views/testing.html');
});

app.get('/test', function(request, response) {
  response.sendFile(__dirname + '/views/test.html');
  console.log("Perfection");
  const url = require('url')
  const urlObj = url.parse(request.url)
  console.log(urlObj.hash) // #some/url
});

app.get('/test2', function(request, response) {
  response.sendFile(__dirname + '/views/test2.html');
});