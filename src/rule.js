'use strict';

var _ = require('underscore');
var when = require('when');

module.exports = {
  detectExistTag: function(root, tag, msg=`This HTML without ${root} ${tag} tag`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}`).length>0) 
        return {};
      return {'defect':msg};
    };
  },
  detectExistTagWithAttribute: function(root, tag, attr, msg=`This HTML without ${root} ${tag} tag include attribute ${attr}`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}[${attr}]`).length>0) 
        return {};
      return {'defect':msg};
    };
  },
  detectExistTagWithAttributeValue: function(root, tag, attr, value, msg=`This HTML without ${root} ${tag} tag include attribute value ${attr}=${value}`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}[${attr}*=${value}]`).length>0)
        return {};
      return {'defect':msg};
    };
  },
  detectLimitOfTagCount: function(root, tag, limit, msg=`This HTML has more than ${limit} ${root} ${tag} tag`){
    // validate function
    return function(dom){
      if (dom(`${root} ${tag}`).length <= limit)
        return {};
      return {'defect':msg};
    };
  },

  detectCountWithoutTagWithAttribute: function(root, tag, attr, msg=null){
    // validate function
    return function(dom){
      var count = dom(`${root} ${tag}:not([${attr}])`).length;
      if (_.isNull(msg))
        msg = `There are ${count} ${root} ${tag} without ${attr} attribute`;
      if (count==0)
        return {};
      return {'defect':msg};
    };
  }
};
