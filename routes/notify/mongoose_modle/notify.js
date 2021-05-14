const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const notifySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdDate: Date,
  title: String,
  userId: String,
  running: {
    speed: String,
    distance: Array,
    location: String,
    date: String,
    
  },
});

module.exports = mongoose.model("Notify", notifySchema);
