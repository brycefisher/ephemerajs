var e = require('../lib/ephemera'),
    should = require('should');

describe('ephemera', function(){

  // Main API
  describe('#objectFactory', function(){
    var Builder = e.objectFactory();

    it('should return a constructor function', function(){
      Builder.should.be.a.function;
    });

    describe('returned constructor function', function(){
      it('should have method #addProperty', function(){
        Builder.addProperty.should.be.a.function;
      });
    });
  });

  // Transformation helper functions
  describe('#int', function(){
    var helper = e.int(0,100);

    it('should return a helper function', function(){
      helper.should.be.a.function;
    });

    describe('returned helper function', function(){
      it('should return numbers between min and max parameters', function(){
        for (var i=0; i<20; i++){
          ( helper(i/20) ).should.be.within(0,100);
        }
      });

      it('should return integers', function(){
        var ret;
        for (var i=0; i<20; i++){
          ret = helper(i/20);
          ret.should.equal(parseInt(ret));
        }
      });
    });
  });

  describe('#float', function(){
    var helper = e.float(5,6);

    it('should return a helper function', function(){
      helper.should.be.a.function;
    });

    describe('returned helper function', function(){
      it('should return numbers between min and max parameters', function(){
        for (var i=0; i<20; i++){
          ( helper(i/20) ).should.be.within(5,6);
        }
      });
    });
  });

  describe('#arr', function(){
    var items = ['zero','one','two','three'],
        helper = e.arr(items);

    it('should return a helper function', function(){
      helper.should.be.a.function;
    });

    describe('returned function', function(){
      it('should return elements from array', function(){
        for (var i=0; i<20; i++){
          items.should.containEql( helper(i/20) );
        }
      });
    });
  });
});