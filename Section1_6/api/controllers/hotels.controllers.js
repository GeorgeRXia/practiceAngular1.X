
//hard coded version
// var hotelData = require('../data/hotel-data.json');

//using the mongodb driver
// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res) {

  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  // A geoJSON point
  var point = {
    type : "Point",
    coordinates : [lng,lat]
  };

  var geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };
 //.geoNear works for in mongoose  "mongoose": "^4.4.8" not  5
  Hotel
    .geoNear(point, geoOptions, function(err, results, stats) {

      console.log('Geo Results', results);
      console.log('Geo stats', stats);
      res
        .status(200)
        .json(results);
    });

};
module.exports.hotelsGetAll = function(req, res) {
  //MongoDb Native Driver********************************
  // var db = dbconn.get();
  // var collection = db.collection("hotels");
  //MongoDb Native Driver********************************
  var offset =0;
  var count=5;
  var maxCount = 10;
  if (req.query && req.query.lat && req.query.lng){
    runGeoQuery(req, res);
    return

  }


  if (req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10)
  }
  if (req.query && req.query.count){
    count = parseInt(req.query.count, 10)
  }

  if (isNaN(offset) || isNaN(count)){
    res.status(400).json({"message" : "NaN"})
    return

  }

  if (count > maxCount) {
    res.status(400).json({"message" : "too much count"})
    return;
  }
//mongoose you go through the model, unlike native driver.
//mongoose sits on top of the native driver. so many of the capailities of the driver are a part of mongoose like .skip.
//The .exec is a mongoose that seems like you need to run after all queries you can use a callback
  Hotel.find()
  .skip(offset)
  .limit(count)
  .exec(function(err, hotels){
    if(err){
      console.log("Error finding hotels")
      res.status(500),json(err)
    }else {

    console.log("found this many ", hotels.length)
    res.json(hotels)
    }
  })


//MongoDb Native Driver********************************
// collection
//   .find()
//   .skip(offset)
//   .limit(count)
//   .toArray(function(err, docs) {
//   console.log("docs", docs)
//   res.status(200).json(docs);
//
// });
//MongoDb Native Driver********************************

  console.log("GET the hotels")

 //using static data
  // var returnData = hotelData.slice(offset,offset+count)
  // res.status(200).json(returnData)

}

module.exports.hotelsGetOne = function(req, res) {
  var hotelId= req.params.hotelId;
  //static data

  // var thisHotel = hotelData[hotelId];
  // console.log("hotel id", hotelId)
  // res.status(200).json(thisHotel)

//NATIVE DRIVER***********************
  // var db = dbconn.get();
  // var collection = db.collection("hotels");



  // collection
  //   .findOne({
  //     _id: ObjectId(hotelId)
  //   }, function(err, doc){
  //     res
  //       .status(200)
  //       .json(doc)
  //   })
 //NATIVE DRIVER***********************

    Hotel
      .findById(hotelId)
      .exec(function(err, doc){
        var response = {
          status : 200,
          message : doc

        }
        if(err){
          response.status = 500;
          response.message = err;
        }else if(!doc) {
          response.status = 404;
          response.message = {"message" : "Id not found"}
        }
        res
          .status(response.status)
          .json(response.message)

      })

}
var _splitArray = function(input) {
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};
module.exports.hotelsAddOne = function(req, res) {

  // NATIVE DRIVER MONGODB--------------------------
  // var db = dbconn.get();
  // var collection = db.collection("hotels");
  // var newHotel;
  // console.log("post new hotel")
  //
  // if(req.body && req.body.name && req.body.stars){
  //  newHotel = req.body;
  //  newHotel.stars = parseInt(req.body.stars, 10);

   // bodyparser middleware in the app.js file puts its data in req.body

   // collection.insertOne(newHotel, function(err, response){
   //   console.log(response.ops)
   //   res.status(201).json(response.ops)
   // })


   // old version------------------------did not add to database because it was static code
   // res.status(200).json(newHotel)
    // old version------------------------

 // }else {
 //   console.log("data missing from body")
 //   res.status(400).json({message: "Error "})
 // }
 // NATIVE DRIVER MONGODB--------------------------

 //this is creating on top level. while .save is for sub documents
 Hotel.create({
   name : req.body.name,
      description : req.body.description,
      stars : parseInt(req.body.stars,10),
      services : _splitArray(req.body.services),
      photos : _splitArray(req.body.photos),
      currency : req.body.currency,
      location : {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }

 }, function(err, hotel){
   if (err){
     res.status(400).json(err)
   }else {
     res.status(201).json(hotel)

   }

 })

}

module.exports.hotelsUpdateOne = function(req, res) {
  //.select is to give specific ones
  var hotelId= req.params.hotelId;
  Hotel
    .findById(hotelId)
    .select("-reviews -rooms")
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : doc

      }
      if(err){
        response.status = 500;
        response.message = err;
      }else if(!doc) {
        response.status = 404;
        response.message = {"message" : "Id not found"}
      }
      if(response.status !== 200){
      res
        .status(response.status)
        .json(response.message)
      } else{
        doc.name = req.body.name;
           doc.description = req.body.description;
           doc.stars = parseInt(req.body.stars,10);
           doc.services = _splitArray(req.body.services);
           doc.photos = _splitArray(req.body.photos);
           doc.currency = req.body.currency;
           doc.location = {
             address: req.body.address,
             coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
           }

          doc.save(function(err, hotelUpdated){
            if(err){
               res.status(500).json(err)
            }else {
              res.status(204).json()

            }

          })
      }
    })

}

module.exports.hotelsDeleteOne = function(req, res) {
  var hotelId= req.params.hotelId;
  Hotel
    .findByIdAndRemove(hotelId)
    .exec(function(err, hotel){
      var response = {
        status : 204,


      }
      if(err){
        response.status = 404;
        response.message = err;
      }else {

      res
        .status(response.status)
        .json()
      }

    })
}
