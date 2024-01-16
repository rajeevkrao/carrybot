var fs = require('fs')
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('./serverhelp.yaml', 'utf8');
console.log(jsyaml.load(spec))