const rjson = require('r-json');
const wjson = require('w-json');
const path = require('path');

module.exports = (member,client) => {
   var dat = rjson(path.join(__dirname,"./pubgmems.json"))
    member.guild.fetchInvites().then(guildInvites => {
      const invite = guildInvites.find(i =>{
        if(i.code == "dkJ9csY") //pubg rooms invite link in carryminati fc guild
           if(i.uses!=dat)
           {
             var role = member.guild.roles.cache.find(r => r.name === "PUBG-Player");
             member.roles.add(role.id)
             wjson(path.join(__dirname,"./pubgmems.json"),i.uses)
           }
      });
    })
}