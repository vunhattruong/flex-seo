'use strict';

var expect = require('chai').expect;

var Rule = require("../src/rule");

describe('Validate default SEO rules', function() {    
    var cheerio = require('cheerio');

    it('<img /> should have alt attribute', function() {
        var dom = cheerio.load('<img alt=""></img>');

        var funObj = Rule.detectExistTagWithAttribute("", "img", "alt");
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });
    
    it('<a /> should have rel attribute', function() {
        var dom = cheerio.load('<a rel="" />');

        var funObj = Rule.detectExistTagWithAttribute("", "a", "rel");
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });

    it('<head> should have <title>', function() {
        var dom = cheerio.load('<head><title>sample title</title></head>');

        var funObj = Rule.detectExistTag("head", "title");
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });

    it('<head> should have <meta name="description" />', function() {
        var dom = cheerio.load('<head><meta name="description" content="balbalbalba."></head>');

        var funObj = Rule.detectExistTagWithAttributeValue("head", "meta", "name", "description");
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });

    it('<head> should have <meta name="keywords" />', function() {
        var dom = cheerio.load('<head><meta name="keywords" content="balbalbalba"><meta name="keywords"></head>');

        var funObj = Rule.detectExistTagWithAttributeValue("head", "meta", "name", "keywords");
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });

    it('Detect there are less than 3 <strong> tags', function() {
        var dom = cheerio.load('<strong>text text</strong><strong>text text</strong><strong>text text</strong>');

        var funObj = Rule.detectLimitOfTagCount("", "strong", 3);
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });

    it('Detect there are more than 1 <h1> tag', function() {
        var dom = cheerio.load('<h1>text text</h1>');

        var funObj = Rule.detectLimitOfTagCount("", "h1", 1);
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });

    it('<div /> <img /> should have alt attribute', function() {
        var dom = cheerio.load('<html><body><div><img alt=""></img></div></body></html>');

        var funObj = Rule.detectExistTagWithAttribute("div", "img", "alt");
        var result = funObj(dom);

        expect(result).to.be.an('object').that.not.own.property('defect');
    });
});
