const fs = require("fs");

const https = require('https');

//const youtube = require("./modules/youtube.js");

const { MessageEmbed } = require('discord.js');

const config = require("./config.json");
const dscmds = require("./DSCMDS.js");

const gdbfix = require("./gdbfix.js");
const usrcmds = require("./users.js");
const bsbots = require("./modules/botselling.js");
const guildscmds = require("./modules/botcommands.js");
//const msglog = require("./modules/msglogger.js");

var express = require('express');
var app = express();

var gsetfile = "./guilds.json";
const gset = require(gsetfile);
const gsetsync = fs.readFileSync(gsetfile);

var usetfile = "./users.json";
const uset = require(usetfile);

const insta = require("./instagram.js");

module.exports =(message, client) => {
  
  //get arguments from the command
  const args = message.content.slice(config.prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  
  bsbots(message, client, args);
  usrcmds(message, client, args);
  guildscmds(message, client);
  //msglog(message, client);

//-----------------------------member commands---------------------------------------------
  
  if(message.content.startsWith(config.prefix + "helpme"))
  {
    message.delete({timeout:1000});
    fs.readFile('help.txt', 'utf8',(err, data) => {
    if (err) throw err;
    var embed = new MessageEmbed().setTitle("Commands for Carrybot").setColor(0x00FF00).setDescription(data);
    message.channel.send(embed).then(message=>message.react("❌"));
    });
  }
  
  if(message.content.startsWith(config.prefix + "myid"))
  {
    message.delete({timeout:1000});
    var tag = "<@" + message.author.id + ">";
    message.author.send(tag +" your Discord ID is : " + message.author.id);
  }
  
  if(message.content.startsWith(config.prefix + "addbot"))
  {
    message.delete({timeout:1000});
    //client.generateInvite(8).then(link => message.channel.send(link)) //without async and await
    async function invite(){
    var link = await client.generateInvite(8);
    var msg = await message.channel.send(link);
    msg.delete({timeout:10000});
    }
    invite();
  };
  
  if(message.content.startsWith(config.prefix + "botservers"))
  {
      let string = '';
      var i=1;
      client.guilds.forEach(guild=>{
      string+= i + '. ' + guild.name + '\n';
      i++;
      })
      var embed = new MessageEmbed().setTitle("Servers which **" + client.user.username + "** has joined").setColor(0x0000FF).setDescription(string);
      message.channel.send(embed);
  };
  
  if(message.content.startsWith(config.prefix + "jd"))
  {
    message.delete({timeout:1000});
    message.author.send("You joined **" + message.guild.name + "** at " + message.member.joinedAt); 
  };
  
  if(message.content.startsWith(config.prefix + "f"))
  {
    message.delete({timeout:1000});
    message.channel.send("Press F to pay respects").then(message=>message.react("🇫"))
  };
  
  if(message.content.startsWith(config.prefix + "idname"))
  {
    var user = client.users.cache.get(args[0]);
    if(user==undefined)
      message.channel.send("User not available");
    else
      message.channel.send(user.username);
  }  
  
  if(message.content.startsWith(config.prefix + "sinfo")){
    message.channel.send(message.guild.members.cache.size);
  }
  
  if(message.content.startsWith(config.prefix + "leaderboard"))
  {
    var msg2=message.channel.send("Calculating Total members...").then(msg => {
      const list = client.guilds.cache.get(message.guild.id);
      var a = [];
      list.members.cache.forEach(member => {
        if(!uset[member.user.id])
          uset[member.user.id]={}
        if(!uset[member.user.id][message.guild.id])
          uset[member.user.id][message.guild.id]={}
        if(!uset[member.user.id][message.guild.id].points)
          uset[member.user.id][message.guild.id].points=0;
        fs.writeFileSync(usetfile, JSON.stringify(uset), (err) => console.error);
        for(var i=0;i<10;i++)
        {
          var user=a[i];
          if(a[i]==null)
          {
            a[i]=member.user.id;
            break;
          }
          else if(uset[member.user.id][message.guild.id].points>uset[a[i]][message.guild.id].points)
          {
            for(var j=10;j>i;j--)
            {
              a[j]=a[j-1];
            }
            a[i]=member.user.id;
            break;
          }
        }
      });
      var lb1="";
      for(var i=0;i<10;i++)
      {
        if(!a[i])
          break;
        let user = client.users.cache.get(a[i]);
        var lb="";
        lb=i+1 +". "+ user.username +" : "+uset[a[i]][message.guild.id].points + " points\n";
        lb1=lb1+lb;
      }
      msg.edit(lb1);
      //msg.delete();
      //message.channel.send(lb1);
    })
  }
  
  if(message.content.startsWith(config.prefix + "checklb"))
  {
    message.delete({timeout:1000});
    const list = client.guilds.cache.get(message.guild.id);
    var a = [];
    var i=1;
    var msgg="";
    list.members.cache.forEach(member => {
      msgg=i+". "+member.user.username;
      i++;
    });
    message.channel.send(msgg);
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
  const ownerarr = config.owner;
  var oa=0;  
  ownerarr.forEach(function(element) {

    if(message.author.id == element)
      oa=1; 
  });
  if((message.member.hasPermission("MANAGE_GUILD")) || (oa))
  {
    if(message.content.startsWith(config.prefix + "bd"))
    {
      var tot= args[0]+1;
      message.channel.bulkDelete(tot);
    }
    if(message.content.startsWith(config.prefix + "working"))
    {
      console.log("Working");
    }
    if(message.content.startsWith(config.prefix + "gdbfix"))
    {
      gdbfix(client, message);
    }
  }
//----------------------------test commands--------------------------------------------------------
  if(message.content.startsWith(config.prefix + "botyt"))
  {
    client.user.setActivity('YouTube', { type: 'WATCHING' })
  };
  
  if(message.content.startsWith(config.prefix + "yt"))
  {
    const youtube=require('./modules/youtube.js');
    
    console.log(youtube.subCount(args[0]));
  };
  
  if(message.content.startsWith(config.prefix + "test"))
  {
    var b = https.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC51OKFGqiMGco1QjZQI6gOg&key='+ process.env.YTKEY+'', (resp) => {
  // A chunk of data has been recieved.
      var a=resp.on('data', (chunk) => {
        chunk = JSON.parse(chunk);
          return(chunk.items[0].statistics.subscriberCount);
      });
    });
    console.log(b);
    
    /*var b=https.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + id + '&key=' + process.env.YTKEY, (resp) =>      {
      // A chunk of data has been recieved.
      var a=resp.on('data', (chunk) => {
        chunk = JSON.parse(chunk);
         return(chunk.items[0].statistics.subscriberCount);
      });
      return a;
     });
  return b;*/
  }  

};


  
