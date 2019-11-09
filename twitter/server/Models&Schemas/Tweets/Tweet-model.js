const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    "id": { type: Number, required: true, uniquie: true},
    "userID": Number,
    "content": String,
    "date": String
})

const Tweet = mongoose.model('tweet', tweetSchema)

module.exports = Tweet;