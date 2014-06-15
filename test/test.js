var e = require('../lib/ephemera'),
    should = require('should');

describe('ephemera', function(){

  // Main API
  describe('#objectFactory', function(){
    var Builder = e.objectFactory();

    it('should return a constructor function', function(){
      Builder.should.be.a.function;
    });

    describe('-> (returned constructor function)', function(){
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

    describe('-> (returned helper function)', function(){
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

    describe('-> (returned helper function)', function(){
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

    describe('-> (returned function)', function(){
      it('should return elements from array', function(){
        for (var i=0; i<20; i++){
          items.should.containEql( helper(i/20) );
        }
      });
    });
  });

  describe('#wArr', function(){
    var items = [
          {value:'FreeBSD', freq:0.1},
          {value:'Ubuntu', freq:0.2},
          {value:'OSX', freq:0.3},
          {value:'Windows', freq:0.4}
        ],
        helper = e.wArr(items);

    it('should return a helper function', function(){
      helper.should.be.a.function;
    });

    describe('-> (returned function)', function(){
      it('should return value properties from array objects', function(){
        for (var i=0; i<20; i++){
          ['FreeBSD','Ubuntu','OSX','Windows'].should.containEql( helper(i/20) );
        }
      });

      it('should weight return values deterministically', function(){
        helper(1/20).should.equal('FreeBSD');
        helper(3/20).should.equal('Ubuntu');
        helper(5/20).should.equal('Ubuntu');
        helper(7/20).should.equal('OSX');
        helper(11/20).should.equal('OSX');
        helper(13/20).should.equal('Windows');
        helper(20/20).should.equal('Windows');
      });
    });
  });

  describe('#colorHex', function(){
    var helper = e.colorHex();

    it('should return a helper function', function(){
      helper.should.be.a.function;
    });

    describe('-> (returned function)', function(){
      it('should return a valid hexadecimal color value', function(){
        for (var i=0; i<=20; i++){
          ( helper(i/20) ).should.match(/^#[0-9a-f]{6}/i);
        }
      });
    });
  });
});