'use strict';

var _ = require('underscore');
var cheerio = require('cheerio');
var when = require('when');

var Rule = require("./rule");

/**
 * Create a SEO defect detector
 * @constructor
 * @param {object} option - used to configure pre-defined rules.
 */
function Flexseo(option) {

  // pre-defined SEO rules
  var default_option = {
    enableImgTagDefect: true,
    enableATagDefect: true,
    enableHeadTagDefect: true,
    enableStrongTagDefect: true,
    enableH1TagDefect: true
  };

  this.option = _.extendOwn(default_option, option);

  this.input = null;
  this.output = null;
  this.dom = null;
  this.rules = [];
}

/**
 * Setup input method
 * @param {object} input - used to feed in HTML file source
 */
Flexseo.prototype.setInput = function(input){
  this.input = input;
}

/**
 * Setup output method
 * @param {object} output - used to represent SEO defect result
 */
Flexseo.prototype.setOutput = function(output){
  this.output = output;
}

/**
 * Add a customized rule
 * @param {object} newRule - used to register a custom rule
 */
Flexseo.prototype.addRule = function(newRule){
  if(typeof newRule !== 'function') {
    console.log("invalid rule object");
    return;
  }
  this.rules.push(newRule);
}

/**
 * Start to detect SEO defects
 */
Flexseo.prototype.detectSEO = function(){
  var deferred = when.defer();
  
  if (this.option.enableImgTagDefect)
    this.rules.push(Rule.detectCountWithoutTagWithAttribute("", "img", "alt"));
  if (this.option.enableATagDefect)
    this.rules.push(Rule.detectCountWithoutTagWithAttribute("", "a", "rel"));
  if (this.option.enableHeadTagDefect){
    this.rules.push(Rule.detectExistTag("head", "title"));
    this.rules.push(Rule.detectExistTagWithAttributeValue("head", "meta", "name", "description"));
    this.rules.push(Rule.detectExistTagWithAttributeValue("head", "meta", "name", "keywords"));    
  }
  if (this.option.enableStrongTagDefect)
    this.rules.push(Rule.detectLimitOfTagCount("", "strong", 15));
  if (this.option.enableH1TagDefect)
    this.rules.push(Rule.detectLimitOfTagCount("", "h1", 1));

  if (_.isNull(this.input))
    deferred.reject(new Error('invalid input object'));
  else
    this.input().done(
      (result) => {
          this.dom = cheerio.load(result);

          _.each(this.rules, (rule)=>{
            var result = rule(this.dom);
            if (!_.isNull(this.output) && result.defect) 
              this.output(result.defect);
          });

          deferred.resolve("finish all SEO defects scan");
      },
      (err) => {
          deferred.reject(err);
      }
    );

  return deferred.promise;
}

module.exports = Flexseo;
