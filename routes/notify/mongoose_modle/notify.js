const mongoose = require("mongoose");
const { Schema } = mongoose;

const notifySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdDate: { type: Date, default: Date.now },
  title: String,
  userId: String,
  response: [String],
  running: {
    speed: String,
    distance: String,
    location: String,
    date: String,
  },
});

module.exports = mongoose.model("Notify", notifySchema);
