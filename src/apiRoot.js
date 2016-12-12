(function() {
  'use strict';

  var UriParameter = require('./uriParameter.js');

  var ApiRoot = function() {
    this.uriParameter = new UriParameter();
  };

  var printStringArray = function(array) {
    return '[' + array.map(function(item) {
      return '"' + item + '"';
    }) + ']';
  };

  ApiRoot.prototype.generate = function(ramlASTRoot) {
    return '(function() {' +
      '\'use strict\';' +
      'module.exports=function(){' +
      'this.title = "' + ramlASTRoot.title + '";' +
      'this.version = "' + ramlASTRoot.version + '";' +
      'this.baseUri = "' + ramlASTRoot.baseUri + '";' +
      'this.protocols = ' + printStringArray(ramlASTRoot.protocols) + ';' +
      'this.mediaType = "' + ramlASTRoot.mediaType + '";' +
      'this.baseUriParameters = ' + this.uriParameter.generate(ramlASTRoot.baseUriParameters) + ';' +
      'this.getCurrentUrl = function(){' +
      'var result = this.baseUri;' +
      'for (var param in this.baseUriParameters){' +
      'result = result.replace("{"+param+"}", this.baseUriParameters[param]());' +
      '}' +
      'return result;' +
      '};' +
      '};' +
      '})();';
  };

  module.exports = ApiRoot;
})();