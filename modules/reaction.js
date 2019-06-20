module.exports = (client) => {
  
client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✅") {
        console.log(reaction.users);
    }
});
 
  
};