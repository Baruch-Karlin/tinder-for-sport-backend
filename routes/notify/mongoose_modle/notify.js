const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const notifySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  time: Date,
  title: String,
  running: {
    speed: String,
    distance: Array,
    location: String,
    Date: String,
  },
});

module.exports = mongoose.model("Notify", notifySchema);
