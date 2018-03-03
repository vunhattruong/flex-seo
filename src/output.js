'use strict';

var fs = require('fs');

/**
 * Create a output method for showing defect result
 * @constructor
 */
function Output() {
}

/**
 * Create a console
 */
Output.prototype.createOutputConsole = function() {

  // write function
  return function(msg){
    console.log(msg);
  }
}

/**
 * Open a file from file path
 * @param {string} filePath - the location of the HTML file
 */
Output.prototype.createOutputFile = function(filePath) {

  // write function
  return function(msg){
    fs.writeFile(filePath, msg);
  }
}

/**
 * Open a node writeable stream
 * @param {object} stream - A node writeable stream
 */
Output.prototype.createOutputStream = function(stream) {

  // write function
  return function(msg){
    stream.write(msg);
    stream.end();
  }
}

module.exports = Output;
