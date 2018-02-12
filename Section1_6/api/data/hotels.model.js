var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  name : {
    type : String,
    required  : true
  },
  rating : {
    type: Number,
    min : 0,
    max : 5,
   
  },
  review : {
    type : String,
    required  : true
  },
  createdOn : {
    type: Date,
    "default" : Date.now
  }

})

var roomSchema = new mongoose.Schema({
  type: String,
  number: Number,
  description : String,
  photos : [String],
  price : Number

})


var hotelSchema = new mongoose.Schema({
  name : {
    type : String,
    required  : true
  },
  stars : {
    type: Number,
    min : 0,
    max : 5,
    default : 0
  },
  services : [String],
  description: String,
  photo : [String],
  currency: String,
  reviews : [reviewSchema],
  rooms : [roomSchema],
  location : {
    address: String,
    //longitute first e-w
    coordinates: {
    type : [Number],
    index : '2dsphere'
    }

  }
});

// var hotelSchema = new mongoose.Schema({
//   name : String,
//   stars : Number,
//   services : [String],
//   description: String,
//   photo : [String],
//   currency: String
// });

//"default" : 0 same as default: 0 for eslint

//A model is a compiled version of the schema. A single instance of a model has a one ot one relatinship with a document in mongodb( this means every time mongoose creates a document it needs to go through the model)


//model needs to be after a schema has been defined
//the last parameter is for the collection name, this is not required. Because if not supplied the model name ('Hotel') will create/look a collection with a lowercase pluraized so 'hotels'
mongoose.model('Hotel', hotelSchema, 'hotels')
