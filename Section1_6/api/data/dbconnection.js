var MongoClient = require('mongodb').MongoClient;
//v2
// var dburl = 'mongodb://localhost:27017/meanhotel';

//v3
var dburl = 'mongodb://localhost:27017';

//node modules var are persistent (have the same state ) so they are reusable. Two places require this file and share the same state of it. No need to use global variables or app level state.

//Also other tutorial may have the connection being opened and closed within the controllers but this is not a good idea, better have a resuable connection like here.


// So this file does not have two seprate instances of it, unlike react which has componenets unmounting



var _connection = null;

var open = function(){
  MongoClient.connect(dburl, function(err, db){
    if (err) {
      console.log("db connection failed");
      return
    }
    //V2
    // _connection = db;
    //v3
    _connection = db.db('meanhotel');
    console.log("db connection");
  });
  //set connection

}
var get = function() {

  return _connection;
}

module.exports = {
  open: open,
  get: get

}
