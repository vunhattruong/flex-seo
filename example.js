
var fs = require('fs');

var Flexseo = require('./');
var Input = require('./').Input;
var Output = require('./').Output;
var Rule = require("./").Rule;

var opt = {
    enableImgTagDefect: true,
    enableATagDefect: true,
    enableHeadTagDefect: true,
    enableStrongTagDefect: true,
    enableH1TagDefect: true
};

var flexseo = new Flexseo(opt);

flexseo.setInput(new Input().createInputFile(__dirname+"/test/test.html"));
//var readable_stream = fs.createReadStream(__dirname+"/test/test.html");
//flexseo.setInput(new Input().createInputStream(readable_stream));

flexseo.setOutput(new Output().createOutputConsole());
//flexseo.setOutput(new Output().createOutputFile(__dirname+"/output.txt"));
//var writeable_stream = fs.createWriteStream(__dirname + '/outstream.txt')
//flexseo.setOutput(new Output().createOutputStream(writeable_stream));

flexseo.addRule(Rule.detectExistTagWithAttribute("head", "meta", "http-equiv"));

console.log("show all of the SEO defects");
flexseo.detectSEO().then(
  function(result){
    console.log(result);
  },
  function(err){
    console.log("catch error: ");
    console.log(err);
  }
);
