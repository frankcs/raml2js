/*globals describe, it*/
var expect = require('expect.js');
var Generator = require('../../src/generator.js');
var Promise = require('promise');
var access = Promise.denodeify(require('fs').access);
console.log(__dirname);
describe('Raml js generator', function() {
  'use strict';

  var destinationPath = '/learn/raml2js/dist/client.js';
  var generator = new Generator('test/basic/raml-def/basic-api.raml', {
    output: destinationPath
  });
  var Client = null;
  var clientInstance = null;

  describe('Generator object', function() {
    it('should generate a file', function() {
      return generator.generate().then(function() {
        return access(destinationPath).then(function() {
          expect(true).to.be(true);
        });
      });
    });

    it('generated file file should behave as a module and export a function', function() {
      Client = require(destinationPath);
      expect(Client).to.be.ok();
    });

    it('instance of generated module has a title field matching basic raml loaded', function() {
      clientInstance = new Client();
      expect(clientInstance.title).to.be('Amazon simple storage API');
    });
  });
});