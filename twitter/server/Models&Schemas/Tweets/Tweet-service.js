const Tweet = require('./Tweet-model')
const mongo = require("../../mongo");

const ReadPreference = require('mongodb').ReadPreference;

mongo.connect();

function get(req, res) {
    
    const docquery = Tweet.find({}).read(ReadPreference.NEAREST);
    docquery
    .exec()
    .then(tweets =>  {
        res.json(tweets)
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

function createTweet(req, res) {
    const {userID, content} = req.body

    const date = new Date()
    Tweet.estimatedDocumentCount()
    .then(
        id => new Tweet({id, date, userID, content})
    )
    .then(
        tweet => tweet.save()
    )
    .then(
        response => res.json(response)
    )
    .catch(
        err => console.log(err)
    )

}

function getOneTweet(req, res) {
    const {id} = req.params;

    Tweet.findOne({id}).then(tweet => {
        res.json(tweet)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

module.exports = {
    get,
    createTweet,
    getOneTweet
}