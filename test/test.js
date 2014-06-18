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

  describe('#colorHexRange', function(){
    var helper = e.colorHexRange('#aa3000', '#ff9a00');

    it('should return a helper function', function(){
      helper.should.be.a.function;
    });

    // Unfortunately, shouldjs + mocha choke when functions throw....even with .should.throw()
    it.skip('should throw an exception for missing parameter', function(){
      (e.colorHexRange('#112233')).should.throw();
    });

    it.skip('should throw an exception for hex codes without #', function(){
      (e.colorHexRange('000000','#112233')).should.throw();
      (e.colorHexRange('#000000','112233')).should.throw();
    });


    it.skip('should throw an exception for hex codes not 7 characters', function(){
      (e.colorHexRange('#112233','#0000000')).should.throw();
      (e.colorHexRange('#0000000000','#112233')).should.throw();
      (e.colorHexRange('#112233','#0000')).should.throw();
      (e.colorHexRange('#000','#112233')).should.throw();
      (e.colorHexRange('#000000','#112233')).should.not.throw();
    });

    it.skip('should throw an exception for hex codes with invalid characters', function(){
      (e.colorHexRange('#ghijkl','#000000')).should.throw();
      (e.colorHexRange('#000000','#abc*/\'')).should.throw();
      (e.colorHexRange('##1234ff','#000000')).should.throw();
      (e.colorHexRange('#012345','#6789ab')).should.not.throw();
      (e.colorHexRange('#cdef00','#000000')).should.not.throw();
    });

    it('should be case insensitive', function(){
      (e.colorHexRange('#abcdef','#ABCDEF')).should.not.throw();
    });

    describe('-> (returned function)', function(){
      it('should return a hex color within specified range', function(){
        var ret, r, g, b;
        for (var i=0; i<=15; i++){
          ret = helper(15/20);
          ret.should.startWith('#');

          r = parseInt(ret.slice(1,3), 16);
          r.should.be.within(parseInt('aa',16), parseInt('ff', 16));

          g = parseInt(ret.slice(3,5), 16);
          g.should.be.within(parseInt('30',16), parseInt('9a', 16));

          b = parseInt(ret.slice(5,7), 16);
          b.should.equal(0);
        }
      });
    });
  });
});
