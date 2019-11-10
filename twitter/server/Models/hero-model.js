const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const heroSchema = new Schema({
    id: { type: Number, required: true, uniquie: true},
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
      },
    name: String,
    bio: String,
    date: String,
    followings: [{type: Number}],
    followedBy: [{type: Number}]

})

heroSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
});

const Hero = mongoose.model('user', heroSchema)

module.exports = Hero;