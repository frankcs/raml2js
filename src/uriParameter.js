(function() {
  'use strict';


  var UriParameter = function() {};

  UriParameter.prototype.generate = function(uriParameters) {
    if (!uriParameters) return 'undefined';
    var result = '{';
    var first = true;
    for (var param in uriParameters) {
      if (!first) result += ',';
      result += param + ': function(fnparam){' +
        'this.' + param + '._defaultValue="{' + param + '}";' +
        'if(!this.' + param + '._value) this.' + param + '._value= this.' + param + '._defaultValue;' +
        'if(!fnparam) return this.' + param + '._value;' +
        'this.' + param + '._value=fnparam;' +
        '}';
    }
    result += '}';
    return result;
  };

  module.exports = UriParameter;
})();