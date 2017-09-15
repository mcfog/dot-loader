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
    def = new Proxy({
        __exp: {}
    }, {
      _dir: settings.defDir,
      _argTest: settings.defArg && (settings.defArg.exec ? settings.defArg : new RegExp(settings.defArg)),
      get: function(target, property) {
          if(target.hasOwnProperty(property)) {
              return target[property];
          }
        var defFile = path.resolve(this._dir, property + '.def');
        loaderContext.addDependency(defFile);
        var content = fs.readFileSync(defFile).toString();
        if (!this._argTest) {
          return content;
        }

        var lines = content.split(/\n/);
        var match = this._argTest.exec(lines[0]);
        if (match && match[1]) {
            return {
                arg: match[1],
                text: lines.slice(1).join("\n")
            }
        } else {
            return content;
        }
      }
    });

    delete settings.defDir;
  }

  var content = fs.readFileSync(this.resourcePath);

  return "module.exports = " + dot.template(content, settings, def);
};
