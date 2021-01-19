module.exports = (reaction,client,cuser) => {
  
  reaction.users.cache.forEach(function(user){
    if(("❌"==reaction.emoji.name) && (user.id==client.user.id) && (!cuser.bot)){
      reaction.message.delete();     
    }
  })
}