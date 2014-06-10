EphemeraJS
----------

A library for converting random uuid strings into full bodied objects. Intended applications include games, tests, and simulations.
The library is intended to make it possible to configure random but realistic data within ranges by extracting sections of a uuid
and transforming it according to various rules. The system is pluggable so that you can create your own custom transformations.

## An Example

    var e = require('ephemera'),
    	uuid = require('node-uuid'),
    	i = 0,
    	names = ['Mike', 'John', 'Steve'],
        Person = e.objectFactory(),
        people = [];
    
    Person.addProperty('age', [0,4], e.int(18,65));
    Person.addProperty('weight', [0,4], e.float(100,250));
    Person.addProperty('name', [2,16], e.arr(names));
    
    for (; i<4; i++) {
    	people.push(Person(uuid.v4()));
    }
    
    console.log(people);
    
At the end of this script, an array of 4 objects will be logged to the console something like this:

    [{
        age: 35,
        weight: 182.35909,
        name: "Steve"
    },{
        age: 27,
        weight: 174.69832,
        name: "Mike"
    },{
        age: 62,
        weight: 229.50807,
        name: "John"
    },{
        age: 54,
        weight: 102.18436,
        name: "Steve"
    }]

## Basic Usage

The ephemera object exposes an objectFactory method which returns a constructor function which you will eventually use to 
create your pseudo random objects. You'll want to add several properties to the constructor first though.

Use the addProperty() method of your objectFactory to define a custom property. The first parameter defines the name of the 
property you wish to create (ex: "name" in the example above). The second property is a two element array which contains the
start and end positions in the UUID to reference when generating this property. The last property is a callback function that
will transform the given portion of the UUID using whatever rules you wish. 

Ephemera comes pre-baked with several convenient transformation methods. Each of the following functions takes one or more
parameters and returns a customized callback function that will execute the transformation:

 + `int(min,max)` - creates a callback function which returns an integer between min and max for a given value from a UUID.
 + `float(min,max)` - creates a callback function which returns a float between min and max for a given value from a UUID.
 + `arr(items)` - creates a callback function which selects an item from the array items.
 + `arr(items, weights)` - **NOT IMPLEMENTED YET** creates a callback function which selects an item from the array items. 
   Weights is an array of the same length as items but contains "cumulative frequencies" for the corresponding entry in 
   items. Ex:
   
     e.arr(['Sara', 'Joanna', 'Henrietta'], [0.5, 0.8, 1])
   
   In the above example, Sara has a 50% chance of being returned by the callback function. Joanna has a 30% chance, and Henrietta 
   has a 20% chance.
 
## Advanced Usage

You can also define your own custom callback transformations. Transformation functions receive one integer as a parameter. Behind
the scenes, ephemera converts the UUID passed to the constructor into a floating point number between 0 and 1. The exact floating
point value is determined by dividing the actual hex value by the total possible hex value. Ex:

    var uuid = '10ec58a-a0f2-4ac4-8393-c866d813b8d1',
        e = require('ephemera'),
        Person = e.objectFactory(),
        someGuy;
   
   Person.addProperty('age', [0,2], function(seed) { return seed; });
   someGuy = Person(uuid);
   console.log(someGuy.age);

In the above code, Person() will extract a slice from the uuid variable (which is '10'). This will be divided by the 
highest possible hex value. Since the string has length two, the highest possible hex value would be ff. So, the value passed to
my custom callback will be 10/ff (or in decimal 16/255) which comes out to be 0.06274509803921569. This value is stored in the
property age on someGuy, and then logged to the console at the end of the script.
