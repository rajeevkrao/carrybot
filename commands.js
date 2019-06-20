const fs = require("fs");

const https = require('https');

//const youtube = require("./modules/youtube.js");

const { RichEmbed } = require('discord.js');

const config = require("./config.json");
const dscmds = require("./DSCMDS.js");

const usrcmds = require("./users.js");
const guildscmds = require("./modules/botcommands.js");
const msglog = require("./modules/msglogger.js");

var express = require('express');
var app = express();

var gsetfile = "./guilds.json";
const gset = require(gsetfile);
const gsetsync = fs.readFileSync(gsetfile);

const insta = require("./instagram.js");

module.exports = (message, client) => {
  
  //get arguments from the command
  const args = message.content.slice(config.prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  
  usrcmds(message, client, args);
  guildscmds(message, client);
  msglog(message, client);

//-----------------------------member commands---------------------------------------------
  
  if(message.content.startsWith(config.prefix + "helpme"))
  {
    message.delete(1000);
    fs.readFile('help.txt', 'utf8',(err, data) => {
    if (err) throw err;
    var embed = new RichEmbed().setTitle("Commands for Carrybot").setColor(0x00FF00).setDescription(data);
    message.author.send(embed);
    });
  }
  
  if(message.content.startsWith(config.prefix + "myid"))
  {
    message.delete(1000);
    var tag = "<@" + message.author.id + ">";
    message.author.send(tag +" your Discord ID is : " + message.author.id);
  }
  
  if(message.content.startsWith(config.prefix + "addbot"))
  {
    client.generateInvite(8).then(link => message.channel.send(link))
  };
  
  if(message.content.startsWith(config.prefix + "botservers"))
  {
      let string = '';
      var i=1;
      client.guilds.forEach(guild=>{
      string+= i + '. ' + guild.name + '\n';
      i++;
      })
      var embed = new RichEmbed().setTitle("Servers which **" + client.user.username + "** has joined").setColor(0x0000FF).setDescription(string);
      message.channel.send(embed);
  };
  
  if(message.content.startsWith(config.prefix + "jd"))
  {
    message.delete(1000);
    message.author.send("You joined **" + message.guild.name + "** at " + message.member.joinedAt); 
  };
  
  if(message.content.startsWith(config.prefix + "pubgroom"))
  {
    
  }    
//----------------------------server commands------------------------------------------------------
  if(message.content.startsWith(config.prefix + "server"))
  {
    if(!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send("You must be the owner or server manager of this server to use this command");
    dscmds(message, client, args); 
  };
 
//----------------------------normal memeber command limiter---------------------------------------
//----------------------------admin level commands-------------------------------------------------
  
  if(message.content.startsWith(config.prefix + "bd"))
  {
    var tot= args[0]+1;
    message.channel.bulkDelete(tot);
  }
  
//----------------------------test commands--------------------------------------------------------
  if(message.content.startsWith(config.prefix + "check"))
  {
    message.channel.send("@" + message.author.tag);
    //message.channel.send("<@"+message.author.id+">");
  }
  
  if(message.content.startsWith(config.prefix + "botyt"))
  {
    client.user.setActivity('YouTube', { type: 'WATCHING' })
  };
  
  if(message.content.startsWith(config.prefix + "yt"))
  {
    
    //console.log(youtube.subCount(args[0]));
  };
  
  if(message.content.startsWith(config.prefix + "test"))
  {
    https.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC51OKFGqiMGco1QjZQI6gOg&key=AIzaSyDLQTe5eh8gUUeMQFueWeK5psOoino4458', (resp) => {
  // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        chunk = JSON.parse(chunk);
        console.log(chunk.items[0].statistics.subscriberCount);
      });
    });
  };

  if(message.content.startsWith(config.prefix + "carrymeme"))
  {
    insta(message,client);
  };
  
  if(message.content.startsWith(config.prefix + "hii"))
  {
    console.log("test initiated");
    setInterval(() => {
    message.channel.send("Hii");
    console.log("test successful");
    }, 1800000);
  };
};


  
