const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    send_user_id: mongoose.Schema.Types.ObjectId,
    accept_user_id: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    posts: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            creator_id: mongoose.Schema.Types.ObjectId,
            creator_name: String,
            content: String,
            date: { type: Date, default: Date.now }
        }
    ]
})

module.exports = mongoose.model('Chat', chatSchema);