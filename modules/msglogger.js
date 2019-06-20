const config = require("../config.json");

module.exports = (message, client) => {
    
  const ownerarr = config.owner;
  ownerarr.forEach(function(element) {

    if(message.author.id == element)
    {
      if(message.content.startsWith(config.prefix))
        console.log("[DISCORD]-<OWNER>"+ message.author.username + "@(" + message.guild.name + ") used command : " + message.content);
      else
        console.log("[DISCORD]-<OWNER>"+ message.author.username + "@(" + message.guild.name + ") : " + message.content); 
    } 
  });
  
  
  
};