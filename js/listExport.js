var fs = require('fs');
var text = fs.readFileSync("/tempemaillist.text", 'utf-8');
var textByLine = text.split('\n')
console.log(textByLine);