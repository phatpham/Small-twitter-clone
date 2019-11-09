const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const heroService = require('./Models&Schemas/User/hero-service')
const tweetService = require('./Models&Schemas/Tweets/Tweet-service')
//use json body parser
app.use(bodyParser.json())
app.use(cors())

let tweets = [
  {
    "id":1,
    "userID":1,
    "content":"HELLO ITS ME",
    "date" : "2019-05-30T18:39:34.091Z"
  },
  {
    "id":2,
    "userID":1,
    "content":"HELLO ITS THE SECOND ME",
    "date" : "2019-05-30T18:39:34.091Z"
  },
  {
    "id":3,
    "userID":3,
    "content":"REEEEEEEEEEEEEEEEE",
    "date" : "2019-05-30T18:39:34.091Z"
  },

]

app.get('/users', (req, res) => {
  heroService.get(req,res)
})

app.get('/users/:id', (request, response) => {
  heroService.getOneUser(request, response)
})

app.delete('/users/:id', (request, response) => {
  heroService.deleteUser(request,response)
})

app.post('/users', (request, response) => {
  heroService.createUser(request, response)
})
app.put('/users', (request, response) => {
  heroService.updateUser(request, response)
})

//API for getting tweets

app.get('/tweets', (req, res) => {
  tweetService.get(req,res)
})

app.get('/tweets/:id', (request, response) => {
  tweetService.getOneTweet(request,response)
})

app.post('/tweets', (request, response) => {
  tweetService.createTweet(request, response)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})