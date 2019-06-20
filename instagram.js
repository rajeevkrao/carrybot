var express = require('express');
var app = express();
var acctok = '2315654128.7ec7873.4253e150ad9b40c2bbeab2ec5672b0e7';


function checking()
{
  app.get('https://api.instagram.com/v1/tags/carryminati/media/recent?client_id=7ec7873de2ff45109875a0767b4e9824', (req,res) => {
    console.log(res);
  });
  console.log("Insta Script is running");
  
}

checking();
