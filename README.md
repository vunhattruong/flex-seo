
<h1 align="center">flex-seo</h1>

<h5 align="center">A Node.js package to scan a HTML file and show all of the SEO defects.</h5>

<br />

## Install
`npm install flex-seo`

## Run tests
`npm test`

## Quick start
```js
var fs = require('fs');

var Flexseo = require('flex-seo');
var Input = require('flex-seo').Input;
var Output = require('flex-seo').Output;
var Rule = require("flex-seo").Rule;

// chain any predefined rules
var opt = {
    enableImgTagDefect: true,
    enableATagDefect: true,
    enableHeadTagDefect: true,
    enableStrongTagDefect: true,
    enableH1TagDefect: true
};

var flexseo = new Flexseo(opt);

// configure input and output
flexseo.setInput(new Input().createInputFile(__dirname+"/test.html"));
flexseo.setOutput(new Output().createOutputConsole());

// implement additional rule for meta tag
flexseo.addRule(Rule.detectExistTagWithAttribute("head", "meta", "http-equiv"));

// show all of the SEO defects
flexseo.detectSEO().then(
  function(result){
    console.log(result);
  },
  function(err){
    console.log("catch error: ");
    console.log(err);
  }
);
```