const getSize = require('get-folder-size');

const myFolder = '/node_modules';

getSize(__dirname+myFolder, (err, size) => {
  if (err) { throw err; }

  console.log(size + ' bytes');
  console.log((size / 1024 / 1024).toFixed(2) + ' MB');
});