var dot = require('dot');
var fs = require('fs');
var path = require('path');
var utils = require('loader-utils');

module.exports = function(content) {
  if (this.cacheable) {
    this.cacheable();
  }

  var loaderContext = this;
  var def;
  var settings = Object.assign({}, dot.templateSettings, {
    selfcontained: true
  });

  if (this.query) {
    Object.assign(settings, typeof this.query ==='string' ? utils.parseQuery(this.query) : this.query);
  }

  if (settings.defDir) {
    def = new Proxy({}, {
      _dir: settings.defDir,
      get: function(target, property) {
        var defFile = path.resolve(this._dir, property + '.def');
        loaderContext.addDependency(defFile);
        return fs.readFileSync(defFile);
      }
    });

    delete settings.defDir;
  }

  var content = fs.readFileSync(this.resourcePath);

  return "module.exports = " + dot.template(content, settings, def);
};
