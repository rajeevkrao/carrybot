module.exports = (client) => {
  client.channels.cache.get("501470146167177238").setName("Handling " + client.guilds.cache.size + " Servers");
  var cmfc = client.guilds.cache.get("395640375533895691")
  client.channels.cache.get("468827103182192640").setTopic(`Total Members in Server - ${cmfc.members.cache.size}`);
  //console.log(client.channels.get("501470146167177238"));
};