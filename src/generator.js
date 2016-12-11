(function() {
  'use strict';
  var Promise = require('promise');
  var APIRoot = require('./apiRoot.js');
  var raml = require('raml-parser');
  var mkpath = Promise.denodeify(require('mkpath'));
  var path = require('path');
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

  var writeASTJSON = function(data) {
    var self = this;
    return function() {
      return writeFile(path.join(path.dirname(self.config.output), 'AST.json'), JSON.stringify(data, null, 2), {
        flag: 'w'
      });
    };
  };

  var actuallyWriteOutput = function(data) {
    var self = this;
    return function() {
      return writeFile(self.config.output, self.apiRoot.generate(data), {
        flag: 'w'
      });
    };
  };

  var output = function(data) {
    var self = this;
    return mkpath(path.dirname(self.config.output))
      .then(actuallyWriteOutput.bind(self)(data))
      .then(writeASTJSON.bind(self)(data));
  };


  Generator.prototype.generate = function() {
    var self = this;
    return raml.loadFile(self.ramlPath)
      .then(output.bind(this));
  };

  module.exports = Generator;
})();