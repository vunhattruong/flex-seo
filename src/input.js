'use strict';

var fs = require('fs');
var when = require('when');

/**
 * Create a input method for reading HTML file
 * @constructor
 */
function Input() {
}

/**
 * Open a file from file path
 * @param {string} filePath - the location of the HTML file
 */
Input.prototype.createInputFile = function(filePath) {

  // read function
  return function(){
    var deferred = when.defer();
    fs.readFile(filePath, (err, data) => {
      if (err) return deferred.reject(err);
      var rawHtml = data.toString().replace((/  |\r\n|\n|\r/gm), "");
      deferred.resolve(rawHtml);
    });
    return deferred.promise;
  };
}

/**
 * Open a node readable stream
 * @param {object} stream - A node readable stream
 */
Input.prototype.createInputStream = function(stream) {

  // read function
  return function(){
    var deferred = when.defer();
    var rawHtml = "";
    if (typeof stream !== "object" && typeof stream.on !== "function") {
        deferred.reject("Invalid stream object");
    } else {
      stream.on('data', (buf) => {
        rawHtml = buf.toString().replace((/  |\r\n|\n|\r/gm),"");
      });
      stream.on('error', (err) => {
        deferred.reject(err);
      });
      stream.on('end', () => {
        deferred.resolve(rawHtml);
      });
    }
    return deferred.promise;
  };
}

module.exports = Input;
