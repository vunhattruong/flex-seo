'use strict';

var fs = require('fs');

function Output() {
}

Output.prototype.createOutputConsole = function() {

  // write function
  return function(msg){
    console.log(msg);
  }
}

Output.prototype.createOutputFile = function(filePath) {

  // write function
  return function(msg){
    fs.writeFile(filePath, msg);
  }
}

Output.prototype.createOutputStream = function(stream) {

  // write function
  return function(msg){
    stream.write(msg);
    stream.end();
  }
}

module.exports = Output;
