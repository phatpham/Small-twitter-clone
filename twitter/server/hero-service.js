const Hero = require('./hero-model')
const mongo = require("./mongo");

const ReadPreference = require('mongodb').ReadPreference;

mongo.connect();

function get(req, res) {
    const docquery = Hero.find({}).read(ReadPreference.NEAREST);
    docquery
    .exec()
    .then(heroes =>  {
        res.json(heroes)
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

function createUser(req, res) {
    const { id, bio, date, name, username, password, followings, followedBy} = req.body
    const user = new Hero({id, bio, date, name, username, password, followings, followedBy})

    user.save().then(() =>{
        res.json(user)
    })
    .catch (err => {
        res.status(500).send(err)
    }) 
}


function updateUser(req,res) {
    const { id, bio, date, name, followings, followedBy} = req.body

    Hero.findOne({id}).then(hero =>{
        hero.bio = bio
        hero.date = date
        hero.name = name
        hero.followings = followings
        hero.followedBy = followedBy
        hero.save()
        .then(() => {
            res.json(hero)
        })
        .catch(err => {
            res.status(500).send(err)
        })
        
    })

}

function deleteUser(req, res) {
    const {id} = req.params;

    Hero.findOneAndRemove({id}).then(hero =>{
        res.json(hero)
    })
    .catch(err =>{
        res.status(500).send(err)
    })
}

function getOneUser(req, res) {
    const {id} = req.params;

    Hero.findOne({id}).then(hero => {
        res.json(hero)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

module.exports = {
    get,
    createUser,
    updateUser,
    deleteUser,
    getOneUser
}