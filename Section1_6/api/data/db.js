//database connection file


var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
  console.log("mongoose connected to " + dburl)
})

mongoose.connection.on('disconnected', function() {
  console.log("mongoose dicconnected to " + dburl)
})
mongoose.connection.on('error', function(err) {
  console.log("mongoose error: " + err)
})

//unix programs can close mongoose connection using this event listener
process.on("SIGINT", function() {
  mongoose.connection.close(function() {
    console.log("Mongoose connection terminated because app is terminated {SIGINT}")
    process.exit(0);
  })
})
process.on("SIGTERM", function() {
  mongoose.connection.close(function() {
    console.log("Mongoose connection terminated because app is terminated {SIGTERM}")
    process.exit(0);
  })
})
process.once("SIGUSR2", function() {
  mongoose.connection.close(function() {
    console.log("Mongoose connection terminated because app is terminated {SIGUSR2}")
    process.kill(process.pid, 'SIGUSR2');
  })
})

//Bring in schemas and models

require('./hotels.model.js')
