//direct messages
const fs = require("fs");

const https = require('https');

const rjson = require('r-json');
const wjson = require('w-json');

//const youtube = require("./modules/youtube.js");

const { RichEmbed } = require('discord.js');

const config = require("../config.json");
const dscmds = require("../DSCMDS.js");
const path = require("path");

const usrcmds = require("../users.js");
const guildscmds = require("./botcommands.js");
const msglog = require("./msglogger.js");

var express = require('express');
var app = express();
/*
var gsetfile = "../guilds.json";
const gset = require(gsetfile);
const gsetsync = fs.readFileSync(gsetfile);
*/

var data = rjson(path.join(__dirname , "../test.json"));
data.dat = {}
data.dat.one = 1;
wjson(path.join(__dirname ,"../test.json"),data);


module.exports = (message, client) => {



};