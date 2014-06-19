var uuid = require('node-uuid'),
    e = require('../lib/ephemera'),
    Palette = e.objectFactory(),
    SkinColors = e.objectFactory();

Palette
  .addProperty('primaryColor', [0,2], e.colorHex())
  .addProperty('secondaryColor', [2,6], e.colorHex())
  .addProperty('accentColor', [7,16], e.colorHex())

console.log(Palette(uuid.v4()));

SkinColors
  .addProperty('skin', [0,32], e.colorHexRange('#e6d4ca', '#b68157'));

console.log(SkinColors(uuid.v4()));
