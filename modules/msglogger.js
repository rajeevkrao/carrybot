const config = require("../config.json");

module.exports = (message, client) => {    
  const ownerarr = config.owner;
  ownerarr.forEach(function(element) {

    if(message.author.id == element)
    {
      if(message.content.startsWith(config.prefix))
        console.log("[DISCORD] => <OWNER> "+ message.author.username + " \t GUILD: " + message.guild.name + "\t\t CHANNEL: " + message.channel.name +" \nCOMMAND:" + message.content);
      else
        console.log("[DISCORD] => <OWNER> "+ message.author.username + " \t GUILD: " + message.guild.name + "\t\t CHANNEL: " + message.channel.name +" \nMESSAGE:" + message.content); 
    } 
  });
};