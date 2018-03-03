'use strict';

var seo = require('./src/flexseo');

// Actual classes exported
seo.Input = require('./src/input');
seo.Output = require('./src/output');
seo.Rule = require('./src/rule');

module.exports = seo;
