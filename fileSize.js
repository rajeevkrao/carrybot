const fs = require('fs');
var stats = fs.statSync(__dirname+"/users.json")
var fileSizeInBytes = stats.size;
var fileSizeInKB = fileSizeInBytes / (1024);
var fileSizeInMB = fileSizeInBytes / (1024*1024);

console.log(fileSizeInBytes,"B\n",fileSizeInKB,"KB\n",fileSizeInMB,"MB")
