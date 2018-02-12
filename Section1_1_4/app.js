require('./instantHello');
var goodbye = require('./talk/goodbye');
var talk = require('./talk');
var question = require('./talk/question');

talk.intro();
talk.hello("George");
var answer = question.ask("whtis the meaning of life");
console.log(answer);
goodbye();
