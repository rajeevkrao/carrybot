const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true,
    sync: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
});

require('dotenv').config()

const btoa = require('btoa')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var express = require('express');
var app = express();

const request = require('request')
const body_parser = require('body-parser')
const path = require("path");
var appf = express().use(body_parser.json()); // creates express http server

var server = require('http').Server(app);
var io = require('socket.io')(server);

const fs = require("fs");
const wj = require('w-json');
const rj = require('r-json');

let webpack = require("webpack");
let webpackDevMiddleware = require("webpack-dev-middleware");

const axios = require("axios");
const lf = require('linkifyjs');
const url = require('url');

var getIP = require('ipware')().get_ip;
const loc = require('iplocation');

const { GoogleSpreadsheet } = require('google-spreadsheet');

const pinger = require('minecraft-pinger')

var serverOn = 0;
var chat_id = "-1001568492513"
var strt = 1;
var stats = 0;

//array of Discord Executable Functions created outside Discord Bot Events and is executed when bot is ready
disFuncs = [];
/*
Prototype => {
	vars:{"v1":"a1"},
	func:(vars)=>{body}
}
*/

var DisFnExec = () =>{
	while(disFuncs[0]){
		disFuncs[0].func(disFuncs[0].vars);
		disFuncs.splice(0,1);
	}
}

if(!client.channels.cache.get("493426052018995211")){
	console.log("Right now Discord Bot is offline");
}

/*
class DisFnExec{
	this.funcs=[]
}*/

async function disMC(){
	try{
		await pinger.pingPromise('147.185.221.212', 29782)
		client.channels.cache.get("866566743831609374").messages.fetch("869489221935722496")
		.then(message=>{message.edit("Server is Online🟢")})
		client.channels.cache.get("866566743831609374").setName("Minecraft Server🟢")
		return 1;
	}
	catch(err){
		client.channels.cache.get("866566743831609374").messages.fetch("869489221935722496")
		.then(message=>{message.edit("Server is Offline🔴")})
		client.channels.cache.get("866566743831609374").setName("Minecraft Server🔴")
		return 0;
	}
}

const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.TGRAM_BOT_TOKEN);

bot.command('ip',async( ctx )=> {
    await bot.telegram.sendMessage(ctx.chat.id, 'Java', {})
		await bot.telegram.sendMessage(ctx.chat.id, 'rural-cherries.auto.playit.gg', {})
		await bot.telegram.sendMessage(ctx.chat.id, 'Bedrock - PE Edition', {})
		await bot.telegram.sendMessage(ctx.chat.id, 'long-sofa.auto.playit.gg', {})
		await bot.telegram.sendMessage(ctx.chat.id, '46542', {})
})

bot.command('status', ctx =>{
	stats = 1;
	checkMCS();
})

/* bot.on("new_chat_members", ctx=>{
	console.log(ctx.message.new_chat_members)
}) */



const seAPI = axios.create({
  baseURL: 'https://api.streamelements.com/kappa/v2/',
  headers: {'Authorization': 'Bearer '+ process.env['SE_TOKEN']}
});

bot.command('timeroff',ctx=>{
	if(ctx.message.chat.id == '-507888689')
	seAPI.put('/bot/timers/5f69ff0087890519c7e76aaf/610991d08a8341605458706e',{enabled:false,name:'ROOM ID and PASS',chatLines:5}).then(res=>{
		ctx.reply("Timer successfully turned off")
	})

})

bot.command('timeron',ctx=>{
	if(ctx.message.chat.id == '-507888689')
	seAPI.put('/bot/timers/5f69ff0087890519c7e76aaf/610991d08a8341605458706e',{enabled:true,name:'ROOM ID and PASS',chatLines:5}).then(res=>{
		ctx.reply("Timer successfully turned on with previous details")
	})
})

bot.on('text',(ctx)=>{
	var list = ctx.message.text.split('\n');

	console.log(ctx.update.message.reply_to_message);
	
	if(ctx.message.text.startsWith("ROOM") && ctx.message.sender_chat.id == "-1001163504506"){
		console.log('reach')
		if(list[3])
			list.splice(3,1)
		console.log(list)
		seAPI.put('/bot/timers/5f69ff0087890519c7e76aaf/610991d08a8341605458706e',{enabled:true,name:'ROOM ID and PASS',chatLines:5,messages:[list[0]+' '+list[1],list[2]]})
			.then((res)=>{
				bot.telegram.sendMessage('-507888689',"Timer set with "+list[0]+"\nTo set it off /timeroff\nTo set back on /timeron")
				console.log(res.data)
			})
			.catch(err=>{
				console.log(err)
			})
	}
	try{
		if(ctx.message.sender_chat.id == "-1001163504506")
		{
			disFuncs.push({"vars":{message:ctx.message.text},
										 "func":(vars)=>{
												client.channels.cache.get("493426052018995211").send(vars.message+"\n<@&481814540598902798>")	
											}
										})
		}
		if(client.channels.cache.get("493426052018995211")){
			DisFnExec();
		}
	}
	catch(err){
		//group members' message
	}
})

bot.launch().then(()=>{
	console.log("Telegram bot Online")
	//bot.telegram.sendMessage("872954435", 'Telegram bot is online now🟢', {})
})

var mcstate = 0

function checkMCS(){
	pinger.pingPromise('accessories-good.at.playit.gg', 29782)
		.then(res=>{
			bot.telegram.getChat(chat_id).then(chat=>{
				if(chat.title != "Minecraft Server - Online🟢")
				{
					bot.telegram.setChatTitle(chat_id, "Minecraft Server - Online🟢")
					bot.telegram.sendMessage(chat_id, 'Server is Online🟢\nClick on /ip to get IP to connect', {})
				}
			})
			/* if(!serverOn || strt || stats){
				// axios.post(`https://api.telegram.org/bot${process.env.TGRAM_BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=Server is Online`)
				bot.telegram.sendMessage(chat_id, 'Server is Online🟢\nClick on /ip to get IP to connect', {})
				bot.telegram.setChatTitle(chat_id, "Minecraft Server - Online🟢")
				serverOn=1;
				strt = 0;
				stats = 0;
			}
			//console.log(res.description.extra) */
		})
		.catch(err=>{
			bot.telegram.getChat(chat_id).then(chat=>{
				if(chat.title != "Minecraft Server - Offline🔴")
				{
					if(!mcstate)
					mcstate=1
					if(mcstate){
					mcstate=0
					bot.telegram.setChatTitle(chat_id, "Minecraft Server - Offline🔴")
					bot.telegram.sendMessage(chat_id, 'Server is Offline🔴', {})
					}
				}
			})
			/* if(serverOn || strt || stats){
				//axios.post(`https://api.telegram.org/bot${process.env.TGRAM_BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=Server is Offline`)
				bot.telegram.sendMessage(chat_id, 'Server is Offline🔴', {})
				bot.telegram.setChatTitle(chat_id, "Minecraft Server - Offline🔴")
				serverOn=0;
				strt = 0;
				stats = 0;
			} */
		})
}

setInterval(checkMCS, 60000);
//-----------------------------discord bot------------------------------------------------------------------------------

client.login(process.env.TOKEN);

//const db = require("./database.js");

var cmd = require("./commands.js");

const owncmds = require("./owncmds.js");
//const dmsg = require("./modules/dmsgs.js");
const react = require("./modules/reaction.js");
const sercup = require("./modules/servercount.js");
const MongoDB = require("./modules/mongodb.js");

var mongo = new MongoDB();

const rep = require("./reply.json");
const config = require("./config.json");

var pcsetfile = "./point.json";
const pcset = require(pcsetfile);

var gsetfile = "./guilds.json";
const gset= require(gsetfile);

//const usrdb = "./users.json";
//const usr = require(usrdb);

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
try{
client.on("ready", () => {
  console.log("%c[SERVER]-->" + client.user.username + " is online in discord",'background:#0f0;color:#fff');
	bot.telegram.sendMessage("872954435", 'Discord bot is online now🟢', {}) //telegram user_id - 872954435 - rajeevkrao
  client.user.setActivity('!helpme', { type: 'LISTENING' })
  sercup(client);
	(async()=>{await disMC();setInterval(disMC, 60000);})();
	DisFnExec();setInterval(DisFnExec, 60000);
})
}
catch(err){
	console.log(err)
}
//reply
client.on("message", (message) => {
  if(message.guild === null)
  {
    //dmsg(message,client);
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
client.on('message', (message) => {
  if(message.guild === null)
  { 
    return 1;
  }
	if(message.author.id !== client.user.id)
	client.channels.cache.get("910485158803693579").send("Server - "+message.guild.name+"\nChannel - "+message.channel.name+"\nUsername - "+message.author.username+"\nMessage - "+message.content)
  cmd(message,client);
});

//owner commands
client.on("message", (message) =>{
	if(message.author.bot) return false
	const ownerarr = config.owner;
  var oa=0;  
  ownerarr.forEach(function(element) {

    if(message.author.id == element)
      oa=1; 
  });
	if(oa){
		if(message.content.startsWith(config.prefix + "resetcommands")){
			delete require.cache[require.resolve('./commands.js')]
			cmd = require("./commands.js");
			console.log("Commands file refreshed")
		}
	}
	if(oa && (message.channel.id == "906634801082150912")){ // executing commmands from discord channel
		try{
			eval(message.content)
		}
		catch (e) {
			console.log(e)
			console.log("error in discord custom coder")
      message.channel.send(JSON.stringify(e.message));

		}
	}
	if(message.channel.type=="dm"){
		owncmds(message,client);
	}
})

//adding points on messaging
client.on("message", (message) => { 
  if(message.guild === null)
  {
    return 1;
  }
  if(message.author.bot)
    return 1;
	var pointcode = rj(__dirname+"/point.json")
	if(message.content.startsWith(pointcode.code)){
		mongo.addPointsToUser(message.author.id,message.guild.id,10)
		message.channel.send("Earned 10 points with that code.\nYou can receive the new code at https://carrybot.rkrao.repl.co/getthepoint")
		var text = Buffer.from(Math.random().toString()).toString("base64").substr(10, 6);
		wj(__dirname+"/point.json",{"code":text})
	}
	else{
		if(!(message.content.startsWith(config.prefix)))
		mongo.addPointsToUser(message.author.id,message.guild.id,1)
		.catch(err=>{
			console.log(err)
		})
	}
  /* if(!usr[message.author.id])
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
  fs.writeFile(usrdb, JSON.stringify(usr), (err) => console.error); */
});

//to keep bot active 24x7
const http = require('http');
server.listen(process.env.PORT,()=>{
	console.log("Web Sever Online")
});
setInterval(() => {
  try{http.get(`http://carrybot.rkrao.repl.co/`);}
	catch(err){
		console.log(err);
	}
}, 280000);

setInterval(() => {
  http.get(`http://b-hit.glitch.me/`);
}, 240000);
//-------------------------------website--------------------------------------------------------------------------
app.set('view engine', 'pug')
app.set('views','./pugs');

app.use(express.static('public'));
app.use(express.static('views'));
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

app.get('/getlc', function(req,res){
	var arr=[];
	///
	/* axios.get('/api/getlivechat')
	.then(res=>{
		res.data.forEach((list,index)=>{
			var date = new Date(list.timestamp)
			console.log(`${index+1}:`+date)
		})
		arr=res.data;
	})
	.then(()=>{
		var result = lf.find(arr[Number(answer)-1].content);
		console.log(result[0].href)
		const current_url = new URL(result[0].href);
		const search_params = current_url.searchParams;
		const id = search_params.get('v');
		res.redirect('https://www.youtube.com/live_chat?v='+id);
	}).catch(err=>{
		console.log(err)
	}) */
	///
	
	if(!client.channels.cache.get("724631013128405103")){
		res.status(400).send().end();
	}
	console.log(client.channels.fetch('724631013128405103').cache)
client.channels.cache.get('724631013128405103').messages.fetch({limit:10}).then(messages=>messages.forEach(message=>{
		
	arr.push({content:message.content,timestamp:message.createdTimestamp})
	})).then(()=>{
		arr.forEach((list,index)=>{
			var date = new Date(list.timestamp)
			console.log(`${index+1}:`+date)
		})
		var result = lf.find(arr[0].content);
		console.log(result[0].href)
		const current_url = new URL(result[0].href);
		const search_params = current_url.searchParams;
		const id = search_params.get('v');
		res.redirect('https://www.youtube.com/live_chat?v='+id);
	});
})

//--------legacy point code

app.get('/pointreq', function(request, response) {
	var pointcode = rj(__dirname+"/point.json")
  response.json(pointcode);
	//response.send(`<h1>${pcset.code}</h1>`)
});

app.get('/getthepointx', function(request, response) {
  response.sendFile(__dirname + '/views/pointcode.html');
});

//===========================

app.get('/getthepoint', (req, res) => {
	var pointcode = rj(__dirname+"/point.json")
	pointcode = pointcode.code
  res.render('points', { pointcode })
})

app.get('/teamslots', (req,res)=>{
	res.sendFile(__dirname+'/views/teamslots.html')
})

app.get('/tourney', (req,res)=>{
	res.sendFile(__dirname+'/views/regslots.html')
})

app.get('/tournget1',async(req,res)=>{
	// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
	const doc = new GoogleSpreadsheet(process.env['SHEETS_ID']);

	await doc.useServiceAccountAuth({
		client_email:process.env['SHEETS_EMAIL'],
		private_key: process.env['SHEETS_KEY'],
	});

	await doc.loadInfo(); // loads document properties and worksheets
	//console.log(doc.title);
	const sheet = doc.sheetsByIndex[0];

	await sheet.loadCells('A1:E300');

	var arr = [];

	// console.log(sheet.cellStats);
	// const test = sheet.getCell(0, 1);
	// console.log(test.value)
	for(i=1;i<=295;i+=6){
		if(!sheet.getCell(i+1, 0).value)
			break;
		var jsn = {
			"teamName":sheet.getCell(i+1, 0).value,
			"members":[]
		}
		for(j=0;j<6;j++){
			if(!sheet.getCell(i+j, 1).value)
				continue;
			jsn.members.push(sheet.getCell(i+j, 1).value)
		}
		const team = sheet.getCell(i, 0);
		arr.push(jsn);
	}
	res.send(arr)
})

app.get('/testing', function(request, response) {
  response.sendFile(__dirname + '/views/testing.html');
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

app.get('/share', function(request, response) {
  response.sendFile(__dirname + '/views/share.html');
});

app.get('/test', function(request, response) {
  response.sendFile(__dirname + '/views/test.html');
  console.log("Perfection");
  const url = require('url')
  const urlObj = url.parse(request.url)
  console.log(urlObj) // #some/url
});

app.get('/test2', function(request, response) {
  response.sendFile(__dirname + '/views/test2.html');
});

app.get('/days', function(request, response) {
  response.sendFile(__dirname + '/views/days.html');
});

app.get('/slota', function(request, response) {
  response.sendFile(__dirname + '/views/slota.html');
});
app.get('/slotb', function(request, response) {
  response.sendFile(__dirname + '/views/slotb.html');
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

app.get('/api/getlivechat', function(req,res){
	var arr = [];
	if(!client.channels.cache.get("724631013128405103")){
		res.status(400).send().end();
	}
	client.channels.cache.get('724631013128405103').messages.fetch({limit:10}).then(messages=>messages.forEach(message=>{
		arr.push({content:message.content,timestamp:message.createdTimestamp})
	})).then(()=>{
		res.send(arr)
	});
})

app.get('/ultra/getlivechat', function(req,res){
	var arr = [];
	if(!client.channels.cache.get("859335922700124171")){
		res.status(400).send();
	}
	client.channels.cache.get('859335922700124171').messages.fetch({limit:10}).then(messages=>messages.forEach(message=>{
		arr.push({content:message.content,timestamp:message.createdTimestamp})
	})).then(()=>{
		res.send(arr)
	});
})

app.get('/playingsong', function(req,res){
	res.sendFile(__dirname+"/views/playingSong.html")
})

app.get('/api/moc/getname', function(req,res){
	res.send(rj(__dirname+"/moc/songName.json"))
})

app.get('/api/moc/songname', function(req,res){
	wj(__dirname+"/moc/songName.json",path.parse(req.query.name).name)
	seAPI.put('/bot/commands/5f69ff0087890519c7e76aaf/61a2df2f1edae307f4564d7c',{
		command:"song",
		reply:`Current Song Playing - ${path.parse(req.query.name).name}`
	})
	.then((res)=>{
		console.log(res.data)
	})
	.catch(err=>{
		console.log(err.response.data)
	})
	io.of('/moc').emit('songname', path.parse(req.query.name).name);
	res.end();
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

function webauth(token){
	if(token==process.env.WEBAUTH)
		return 1;
	else
		return 0;
}

//socket.io

function dmsgemit(message){
  io.of('/tchats').emit('smsg', message.content);
}