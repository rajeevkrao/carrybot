//guild database fixer
const fs = require("fs");

module.exports = (client, message) => {

  var gsetfile = "./guilds.json";
  const gset= require(gsetfile);
  
  client.guilds.forEach(guild=>{
      var gid=guild.id;
      if(!gset[guild.id])
        gset[guild.id]={};
      if(!gset[guild.id].user)
        gset[guild.id].user={}
      fs.writeFileSync(gsetfile, JSON.stringify(gset), (err) => console.error);          
      guild.members.forEach(user=>{
        gset[guild.id].user[user.id]=1;
        fs.writeFileSync(gsetfile, JSON.stringify(gset), (err) => console.error);   
      })
      message.channel.send("Info of "+ guild.name +" has been updated");
  })
  fs.writeFileSync(gsetfile, JSON.stringify(gset), (err) => console.error); 
  

  

};