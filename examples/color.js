var uuid = require('node-uuid'),
    e = require('../lib/ephemera'),
    Palette = e.objectFactory();

Palette
  .addProperty('primaryColor', [0,2], e.colorHex())
  .addProperty('secondaryColor', [2,6], e.colorHex())
  .addProperty('accentColor', [7,16], e.colorHex())

console.log(Palette(uuid.v4()));