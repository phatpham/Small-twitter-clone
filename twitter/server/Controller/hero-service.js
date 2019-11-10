const Hero = require('../Models/hero-model')
const mongo = require("../mongo");

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

async function createUser(req, res) {
    const { bio, name, username, password, followings, followedBy} = req.body
    
    const date = new Date()
    Hero.estimatedDocumentCount()
    .then(
        id => new Hero({ id, bio, date, name, username, password, followings, followedBy})
    )
    .then(
        user => user.save()
    )
    .then(
        response => res.json(response)
    )
    .catch(
        err => console.log(err)
    )

}


function updateUser(req,res) {
    const { id, bio, name, followings, followedBy} = req.body

    Hero.findOne({id}).then(hero =>{
        hero.bio = bio
        hero.date = new Date()
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

const generateID = async () => {
    try {
        const maxId = await Tweet.estimatedDocumentCount();
        return maxId + 1
    } catch {
        console.log('generateID error')
    }
}


module.exports = {
    get,
    createUser,
    updateUser,
    deleteUser,
    getOneUser
}