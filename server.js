const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    sync: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
});

var express = require('express');
var app = express();

const fetch = require('node-fetch');
const https = require('https');
const btoa = require('btoa');

const wjson  = require('w-json');
const rjson  = require('r-json');

var server = require('http').Server(app);
var io = require('socket.io')(server);

const axios = require('axios');

const path  = require('path');

const request = require('request')
const bodyParser = require('body-parser')

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const fs = require("fs");

const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:rjvkumaraswamy@gmail.com', publicVapidKey, privateVapidKey);

var getIP = require('ipware')().get_ip;
const loc = require('iplocation');
//-----------------------------discord bot------------------------------------------------------------------------------

client.login(process.env.TOKEN);

//const db = require("./database.js");

const cmd = require("./commands.js");
const dmsg = require("./modules/dmsgs.js");
const react = require("./modules/reaction.js");
const sercup = require("./modules/servercount.js");
const pubgroles = require("./modules/pubgroles.js");
const msglog = require("./modules/msglogger.js");
const rmBotMsg = require("./modules/rmBotMsg.js");

const rep = require("./reply.json");
const config = require("./config.json");

var gsetfile = "./guilds.json";
const gset= require(gsetfile);

const usrdb = "./users.json";
const usr = require(usrdb);

//const spam = require("./spam.js");

react(client);

client.on("guildCreate", guild => {
  console.log(client.user.username + " was added to " + guild.name + " by " + guild.owner.user.username)
  if(gset[guild.id])
  {
    delete gset[guild.id].removed
    fs.writeFileSync(gsetfile, JSON.stringify(gset), (err) => console.error);
  }
  gset[guild.id] = {};
  gset[guild.id].name = guild.name;
  fs.writeFileSync(gsetfile, JSON.stringify(gset), (err) => console.error);
  console.log("Server - " + guild.name + "is registered in our database");
  sercup(client);
  return 1;    
});

client.on("guildDelete", guild => {
  console.log(client.user.username + " is kicked/banned from " + guild.name)
  if(!gset[guild.id])
    return 1;
    gset[guild.id].removed = 1;
    fs.writeFileSync(gsetfile, JSON.stringify(gset), (err) => console.error);
    console.log("Server - " + guild.name + " has no connection between our database");
    sercup(client);
    return 1;
});

client.on("guildMemberAdd", member => {
  pubgroles(member,client);
  var cmfc = client.guilds.cache.get("395640375533895691")
  client.channels.cache.get("468827103182192640").setTopic(`Total Members in Server - ${cmfc.members.cache.size}`);
});

client.on("guildMemberRemove", member => {
  var cmfc = client.guilds.cache.get("395640375533895691")
  client.channels.cache.get("468827103182192640").setTopic(`Total Members in Server - ${cmfc.members.cache.size}`);
});

client.on("ready", () => {
  console.log("[SERVER]-->" + client.user.username + " is online in discord");
  client.user.setActivity('!helpme', { type: 'LISTENING' })
  sercup(client);
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
      await reaction.users.fetch();
      await reaction.message.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }
  rmBotMsg(reaction,client,user);
});

client.on("message", (message) => { 
  dmsgemit(message);
  if(message.guild === null)
  {
    return 1;
  }
  cmd(message,client); //commands
  msglog(message, client);
  if(message.author.bot){
    dmsg(message,client);
    return 1;
  }
  if(!usr[message.author.id])
  {
    usr[message.author.id] = {};
    usr[message.author.id].name = message.author.username;
    fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
  }
  if(!usr[message.author.id][message.guild.id])
    usr[message.author.id][message.guild.id] = {};
  if(!usr[message.author.id][message.guild.id].points)
    usr[message.author.id][message.guild.id].points = 0;
  fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
  usr[message.author.id][message.guild.id].points++;
  fs.writeFileSync(usrdb, JSON.stringify(usr), (err) => console.error);
  //replies from bot to users
  if(rep.exact[message.content.toLowerCase()])
    return message.channel.send(rep.exact[message.content.toLowerCase()]); 
  var starts =rep.starts
  message.content=message.content.toLowerCase();
  starts.forEach(function(key){
    if(message.content.startsWith(Object.keys(key)[0]))
      return message.channel.send(key[Object.keys(key)[0]]);
  });
  for(let i=0;i<Object.keys(rep.contains).length;i++)
    if(message.content.includes(Object.keys(rep.contains)[i]))
      return message.channel.send(rep.contains[Object.keys(rep.contains)[i]])
});

//to keep bot active 24x7
const http = require('http');

server.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/hit`);
}, 280000);

setInterval(() => {
  http.get(`http://b-hit.glitch.me/`);
}, 240000);
//-------------------------------website--------------------------------------------------------------------------
app.enable('trust proxy');
app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});

//app.use(require('express-static')('./'));

app.use(express.static('public'));
app.use(express.static('views'));
// http://expressjs.com/en/starter/basic-routing.html

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/getblogs', function(request, response) {

  axios.get(`https://www.googleapis.com/blogger/v3/blogs/1358046878431419921?maxPosts=5&view=READER&alt=json&prettyPrint=true&key=${process.env.GAPI_KEY}`)
  .then(function (res) {
    response.send(JSON.stringify(res.data));
  })
  .catch(function (error) {
    console.log(error);
  })
});

app.post('/api/discord/fetchmessages', function(req,res){
	var {channelId,lastMsgId} = req.body;
	(async()=>{
		var arr=[];
		var i=0;
		if(lastMsgId!="0")
		await client.channels.cache.get(channelId).messages.fetch({limit:30,before:lastMsgId}).then(messages => messages.forEach(function (message){
			arr[i++]={"username":message.author.username,"content":message.content,"id":message.id};
		}))
		else
		await client.channels.cache.get(channelId).messages.fetch({limit:30}).then(messages => messages.forEach(function (message){
			arr[i++]={"username":message.author.username,"content":message.content,"id":message.id};
		}))
		res.json(
      {
        messages:arr,
        channelName:client.channels.cache.get(channelId).name,
        guildName:client.channels.cache.get(channelId).guild.name
      }
    );
	})();
  
});

app.get('/api/pubgm/events',function(req,res){
  var pubgm = rjson(path.join(__dirname,"pubgm.json"))
  res.json(pubgm.events)
})

app.post('/subscribe', async(req, res) => {
  const {subscription,username} = req.body;
  res.status(201).json({});
  var notifs=rjson(path.join(__dirname,'notify-users.json'));
  var flag = 0;
  await notifs.forEach(function(item){
    if(item.subscription.endpoint==subscription.endpoint){
      flag=1;
      console.log("reach");
    }
  })
  console.log("flag = ",flag)
  if(!flag){
    notifs.push(req.body);
    wjson(path.join(__dirname,'notify-users.json'),notifs);
  }  
});

app.get('/discordbotinvite', function(request, response) {
  client.generateInvite(8).then(link => 
  response.redirect(link)
  );  
});

app.get('/hit', function(request, response) {
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

app.get('/pointreq', function(request, response) {
  var users = JSON.parse(fs.readFileSync('./point.json', 'utf8')); 
  response.json(users);
});

app.get('/testing', function(request, response) {
  response.sendFile(__dirname + '/views/testing.html');
});

app.get('/test', function(request, response) {
  response.sendFile(__dirname + '/views/test.html');
});

app.get('/logincode', function(request, response) {
  var {code} = request.query;
  const CLIENT_ID = process.env.DC_ID;
  const CLIENT_SECRET = process.env.DC_SECRET;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const redirect = "https://discordapp.com/oauth2/authorize?client_id=394043043931619328&redirect_uri=https%3A%2F%2Fcarrybot.glitch.me%2Flogincode&response_type=code&scope=identify%20email";
  (async() => {
  const res = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await res.json();
  axios.get(
      `https://discordapp.com/api/users/@me`,
      {headers: {Authorization: `Bearer ${json.access_token}`}}
    ).then(function (resp) {
      var users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
      if(!users[resp.data.id])
      {
        users[resp.data.id]={};
        users[resp.data.id].name=resp.data.username;
      } 
      users[resp.data.id].name=resp.data.username;
      users[resp.data.id].tokens=json;
      fs.writeFileSync('./users.json', JSON.stringify(users), (err) => console.error);
      response.redirect(`/login?token=${json.access_token}`);
    }).catch(err => {
      response.redirect('/logout');
    })
  })();
});

app.get('/vsarr', function(request, response) {
  response.json(JSON.parse(fs.readFileSync('./vsarr.json', 'utf8')) );
});

app.get('*', function(request,response){
  response.sendFile(__dirname + '/views/web.html');
})

//socket

function dmsgemit(message){
  io.of('/logs').emit('log', { username: message.author.username, message: message.content});
  io.of('/dchats').emit('rmsg', { username: message.author.username, message: message.content});
  io.of('/tchats').emit('smsg', message.content);
}

io.on('connection', function(socket){
  socket.on('disconnect', function(){
  });
});

io.of('/tchats').on('connection',function(socket){
  socket.on('message',function(data){
    var notifs=rjson(path.join(__dirname,'notify-users.json'))
    notifs.forEach(function(item){
      const payload = JSON.stringify({ title: data.username, body: data.message });
      if(item.username!=data.username)
        webpush.sendNotification(item.subscription, payload).catch(error => {
          console.error(error.stack);
        });
    })
    client.channels.cache.get("699152794287865866").send(JSON.stringify(data));
  })
})

io.of('/dchats').on('connection',function(socket){
  socket.on('message',function(data){
    client.channels.cache.get(data.channelId).send(data.message);
  })
})