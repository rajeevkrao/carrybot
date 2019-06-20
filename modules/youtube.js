const https = require('https');

const config = require("../config.json");

module.exports = {
  
subCount(id)
{
     var b=https.get('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + id + '&key=' + process.env.YTKEY, (resp) =>      {
      // A chunk of data has been recieved.
      var a=resp.on('data', (chunk) => {
        chunk = JSON.parse(chunk);
         return(chunk.items[0].statistics.subscriberCount);
      });
      return a;
     });
  return b;
    
}
, 
viewCount()
{
  console.log("v");
}
  
};
