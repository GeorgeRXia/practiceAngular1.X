var fs = require('fs');
console.log("Going to get a File");
// var onFileLoad = function(err, file){
//   console.log("Got the file");
//
// }
// fs.readFile('readFileSync.js', onFileLoad
// );
//
// console.log("app continues..");

var file = fs.readFileSync('readFileSync.js');
console.log("Got the file");
console.log("app continues...")
