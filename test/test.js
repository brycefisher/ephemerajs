var e = require('../lib/ephemera'),
    should = require('should');

describe('ephemera', function(){
  describe('#objectFactory', function(){
    var Builder = e.objectFactory();

    it('should return a constructor function', function(){
      Builder.should.be.a.function;
    });

    it('returned constructor should have method #addProperty', function(){
      Builder.addProperty.should.be.a.function;
    });
  });

  describe('#int', function(){
    var helper = e.int(0,100);

    it('should return a helper function', function(){
      helper.should.be.a.function;
    });

    it('returned helper function should return numbers between min and max parameters', function(){
      for (var i=0; i<20; i++){
        ( helper(i/20) ).should.be.within(0,100);
      }
    });

    it('returned helper function should return integers', function(){
      var ret;
      for (var i=0; i<20; i++){
        ret = helper(i/20);
        ret.should.equal(parseInt(ret));
      }
    });
  });
});