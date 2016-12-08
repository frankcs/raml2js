(function() {
  'use strict';
  var Promise = require('promise');
  var APIRoot = require('./apiRoot.js');
  var raml = require('raml-parser');
  var writeFile = Promise.denodeify(require('fs').writeFile);
  var merge = require('merge');

  var DEFAULT = {
    output: 'client.js',
  };

  var Generator = function(ramlPath, options) {
    this.config = merge(true, DEFAULT, options);
    this.apiRoot = new APIRoot();
    this.ramlPath = ramlPath;
  };



  Generator.prototype.generate = function() {
    var self = this;
    return raml.loadFile(self.ramlPath).then(function(data) {
      return writeFile(self.config.output, self.apiRoot.generate(data), {
        flag: 'w'
      });
    });
  };

  module.exports = Generator;
})();