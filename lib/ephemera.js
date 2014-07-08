// Check for AMD or CommonJS module support before creating global namespace.
if (typeof define === 'undefined' && typeof exports == 'undefined') {
  var ephemera = {};
}

(function(exports) {

  // Helper function that slices and floats a uuid.
  function uuidToFloat(uuid, source) {
    var pureHex = uuid.replace(/-/g,''),
        fragment = pureHex.slice(source[0], source[1]),
        maxHex = '';

    for (var i=0; i<fragment.length; i++) {
      maxHex += 'f';
    }

    return (parseInt(fragment, 16) / parseInt(maxHex, 16));
  }

  // Creates the ephemera constructor method and exposes it other modules.
  exports.objectFactory = function () {
    // Property metadata is stored privately inside the closure.
    var props = [],
        factory = function (uuid) {
          var obj = {},
              i = 0,
              p;

          for (; i < props.length; i++) {
            p = props[i];
            obj[p.label] = p.callback(uuidToFloat(uuid, p.source), obj);
          }

          return obj;
        };

    // This method on the constructor adds more properties to the final objects
    // returned from the constructor.
    factory.addProperty = function (label, source, callback) {
      props.push({
        label: label,
        source: source,
        callback: callback
      });
      return this;
    };

    return factory;
  };

  exports.int = function(min, max) {
    return function(float) {
      var range = max - min;
      return Math.round(float * range + min);
    }
  };

  exports.float = function(min, max) {
    return function(float) {
      var range = max - min;
      return (float * range + min);
    }
  };

  exports.arr = function(items) {
    return function(float) {
      return items[Math.round(float * (items.length - 1))];
    }
  };

  exports.wArr = function(items) {
    return function(float) {
      var prev = 0,
          cur = 0,
          i = 0;

      if (float === 1) {
        return items[items.length - 1].value;
      } else {
        for (; i<items.length; i++){
          cur += items[i].freq;
          if ((prev <= float) && (cur > float)) {
            return items[i].value;
          }
          prev += items[i].freq;
        }
      }
    };
  };

  function colorHex(float) {
      var scale = float * parseInt('ffffff', 16),
          round = Math.round(scale),
          hex = (round).toString(16),
          pad = ("00000" + hex).slice(-6);
      return "#" + pad;
  }

  exports.colorHex = function() {
    return colorHex;
  };

  function scaleColor(color, min, max) {
    var min = parseInt(min, 16);
    var range = parseInt(max, 16) - min;
    var float = parseInt(color, 16) / 255;
    var scale = float * range + min;
    var round = Math.round(scale);
    var hex = (round).toString(16);
    return ("00" + hex).slice(-2);
  }

  function fromRgbRange(r) {
    return sortRgb({
      r: [r[0].slice(1,3), r[1].slice(1,3)],
      g: [r[0].slice(3,5), r[1].slice(3,5)],
      b: [r[0].slice(5,7), r[1].slice(5,7)]
    });
  }

  function sortRgb(rgb){
    var flip = function (hexs) {
      return (parseInt(hexs[0], 16) > parseInt(hexs[1], 16));
    };
    return {
      r: (flip(rgb.r)) ? [rgb.r[1], rgb.r[0]] : rgb.r,
      g: (flip(rgb.g)) ? [rgb.g[1], rgb.g[0]] : rgb.g,
      b: (flip(rgb.b)) ? [rgb.b[1], rgb.b[0]] : rgb.b,
    };
  }

  function validHex(hex) {
    if (typeof hex !== 'string')
      return false;
    if (!/^#[0-9a-fA-F]{6}$/.test(hex))
      return false;
    return true;
  }

  exports.colorHexRange = function(min, max) {
    if (!validHex(max))
      throw new Error('Invalid max hex color');

    if (!validHex(min))
      throw new Error('Invalid min hex color');

    return function(float){
      var rawHex = colorHex(float),
          rgb = fromRgbRange([min, max]),
          r = scaleColor(rawHex.slice(1,3), rgb.r[0], rgb.r[1]),
          g = scaleColor(rawHex.slice(3,5), rgb.g[0], rgb.g[1]),
          b = scaleColor(rawHex.slice(5,7), rgb.b[0], rgb.b[1]);
      return "#" + r + g + b;
    };
  };

  // AMD
  if (typeof define === 'function') {
    define(function() {
      return exports;
    });
  }

})((function(){

  // Global
  if (typeof ephemera !== 'undefined') {
    return ephemera;
  }

  // Node / CommonJS
  else if (typeof exports !== 'undefined') {
    return exports;
  }

  // AMD
  else {
    return {};
  }

})());
