(function() {
  'use strict';


  var apiRoot = function(options) {

  };

  apiRoot.prototype.generate = function(ramlASTRoot) {
    return '(function() {' +
      '\'use strict\';' +
      'module.exports=function(){' +
      'this.title = "' + ramlASTRoot.title + '";' +
      '};' +
      '})();';
  };

  module.exports = apiRoot;
})();