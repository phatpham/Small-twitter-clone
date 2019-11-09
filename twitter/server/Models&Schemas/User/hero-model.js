const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
    id: { type: Number, required: true, uniquie: true},
    name: String,
    bio: String,
    date: String,
    followings: [{type: Number}],
    followedBy: [{type: Number}]

})

const Hero = mongoose.model('user', heroSchema)

module.exports = Hero;