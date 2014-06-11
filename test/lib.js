var uuid = require('node-uuid').v4(),
    e = require('../lib/ephemera'),
    Person = e.objectFactory(),
    somebody;

Person
    .addProperty('age', [0,2], e.int(6,95))
    .addProperty('name', [5,8], e.wArr([
        {freq:.66, value:'Sara'},
        {freq:.24, value:'MaryJane'},
        {freq:.1, value:'Ngu'}
    ]))
    .addProperty('job', [3,16], function(float, obj) {
        var jobs = ['lawyer','manager','teacher','doctor','ceo','macdonalds'],
            jobPicker = e.arr(jobs);

        if (obj.age > 65) {
            return 'retired';
        } else if (obj.age < 22) {
            return 'student';
        } else {
            return jobPicker(float);
        }
    });

somebody = Person(uuid);
console.log(somebody);