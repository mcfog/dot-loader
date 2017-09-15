var dot = require('dot');
var fs = require('fs');
var utils = require('loader-utils');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }
  
  var settings = Object.assign({}, dot.templateSettings, {
    selfcontained: true
  }, utils.parseQuery(this.query));

  var content = fs.readFileSync(this.resourcePath);

  return "module.exports = " + dot.template(content, settings);
};
