//v3 using native driver
// require('./api/data/dbconnection.js').open()
//v4 mongoose
require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');




app.set('port', 3000);


app.use(function(req,res,next){
  console.log(req.method, req.url)
  next();
})
//you can add argument to say which folders you want only from, leaving out others
// app.use('/css', function(req,res,next){
//   console.log(req.method, req.url)
//   next();
// })

app.use(express.static(path.join(__dirname, 'public')))
app.use('/node_modules', express.static(__dirname + '/node_modules'
))
// app.use('/public/bob', express.static(path.join(__dirname, 'public'))); Both these codes allows access to the folder to the browser


//ordering of middleware matters. this will allow Bodyparser tp run before /hotels routes while not for the static page
app.use(bodyParser.urlencoded({extended: false}));

app.use("/hotels", routes);




//**** you can set up routes like this or use the express.Router()

// app.get('/', function(req, res) {
//   console.log("GET the homepage")
//   // res.status(404).send("Express Yourself")
// res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'))
// })



// app.get('/json', function(req, res) {
//   console.log("GET the jspn")
//   res.status(200).json({"jsonData": true})
//
// })
// app.get('/file', function(req, res) {
//   console.log("GET the file")
//   res.status(200).sendFile(path.join(__dirname, 'app.js'))
//
// })

//**************************************************
var server = app.listen(app.get('port'),  ()=>{
  var port = server.address().port;
  console.log("hello" + port)

}

);
