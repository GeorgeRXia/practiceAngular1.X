var fs = require('fs');
console.log("Going to get a File");
var onFileLoad = function(err, file){
  console.log("o");

}
fs.readFile('readFileSync.js', onFileLoad
);

console.log("app continues..");



console.log("app continues...")
