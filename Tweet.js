//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var TweedSchema = new Schema({
  title: {
    type: String,
    min: [20, "Too short"],
    required: [true, "Must include title?"],
  },
  tweet: {
    type: String,
    max: [30, "Too Long"],
    required: [true, "Must include title?"],
  },
  createdAt: Number,
});
module.exports.TweetSchema = mongoose.model("TweedSchema", TweedSchema);
