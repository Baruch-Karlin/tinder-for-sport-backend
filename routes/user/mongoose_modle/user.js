const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    hash_password: String,
    telephone: String,
    picture: String,
    sports: [
        {
            running: {
                speed: String,
                distance: Schema.Types.Decimal128,
                location: String,
            }
        }]
})

module.exports = mongoose.model('User', userSchema);