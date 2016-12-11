/*globals describe, it, beforeEach*/
var expect = require('expect.js');
var Generator = require('../../src/generator.js');
var path = require('path');


var destinationPath = path.join(path.dirname(process.cwd()), 'dist/client.js');
var generator = new Generator('test/basic/raml-def/basic-api.raml', {
  output: destinationPath
});

describe('Raml js generator', function() {
  'use strict';

  var Client = null;
  var clientInstance = null;

  beforeEach(function() {
    return generator.generate();
  });

  describe('Client Object Structure', function() {
    it('generated file file should behave as a module and export a function', function() {
      Client = require(destinationPath);
      expect(Client).to.be.ok();
    });

    it('client instance has a title field matching basic raml loaded', function() {
      clientInstance = new Client();
      expect(clientInstance.title).to.be('Amazon simple storage API');
    });

    it('client instance has a version field matching basic raml loaded', function() {
      clientInstance = new Client();
      expect(clientInstance.version).to.be('1');
    });

    it('client instance has a baseUri field matching basic raml loaded', function() {
      clientInstance = new Client();
      expect(clientInstance.baseUri).to.be('https://{destinationBucket}.s3.amazonaws.com');
    });

    it('client instance has a protocols field matching basic raml loaded', function() {
      clientInstance = new Client();
      expect(clientInstance.protocols).to.contain('HTTP');
      expect(clientInstance.protocols).to.contain('HTTPS');
    });

    it('client instance has a mediaType field matching basic raml loaded', function() {
      clientInstance = new Client();
      expect(clientInstance.mediaType).to.be('application/json');
    });

    it('client instance has method getCurrentUrl that gets the current state of the url', function() {
      clientInstance = new Client();
      expect(clientInstance.getCurrentUrl()).to.be('https://{destinationBucket}.s3.amazonaws.com');
    });

    it('client instance has a baseUriParameters wich exposes functions that modifies get currentUrl', function() {
      clientInstance = new Client();
      clientInstance.baseUriParameters.destinationBucket('base');
      expect(clientInstance.getCurrentUrl()).to.equal('https://base.s3.amazonaws.com');
    });
  });

});