const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
//use json body parser
app.use(bodyParser.json())
app.use(cors())

let users= [
    {
      "id": 1,
      "name": "Phat1",
      "bio": "hallo",
      "date": "2019-05-30T17:30:31.098Z",
      "followings": [2,3],
      "followedBy": [3]
    },
    {
      "id": 2,
      "name": "Phat2",
      "bio": "halo2",
      "date": "2019-05-30T18:39:34.091Z",
      "followings": [3],
      "followedBy": [1]
    },
    {
      "id": 3,
      "name": "Phat3",
      "bio": "halo2",
      "date": "2019-05-30T19:20:14.298Z",
      "followings": [1],
      "followedBy": [2]
    }
]

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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/users', (req, res) => {
  console.log("haha")
  res.json(users)
})

app.get('/users/:id', (request, response) => {
    const id = request.params.id
    const user = users.find(user => user.id.toString() === id)

    if (user) {    
        console.log(user)
        response.json(user)  
    } else {    
        response.status(404).end()  
    } 
})

app.delete('/users/:id', (request, response) => {
    const id = Number(request.params.id)
    users = users.filter(user => user.id !== id)
  
    response.status(204).end()
})

app.post('/users', (request, response) => {

    const body = request.body 

    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    
      const user = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
        bio: "halo2",
      }
    
      users = users.concat(user)
      response.json(users)

  })



app.get('/users', (req, res) => {
  console.log("haha")
  res.json(users)
})

app.get('/users/:id', (request, response) => {
    const id = request.params.id
    const user = users.find(user => user.id.toString() === id)

    if (user) {    
        console.log(user)
        response.json(user)  
    } else {    
        response.status(404).end()  
    } 
})

app.delete('/users/:id', (request, response) => {
    const id = Number(request.params.id)
    users = users.filter(user => user.id !== id)
  
    response.status(204).end()
})

app.post('/users', (request, response) => {

    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    
      const user = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
        bio: "halo2",
      }
    
      users = users.concat(user)
      response.json(users)

  })

 

//API for getting tweets

app.get('/tweets', (req, res) => {
  console.log("haha")
  res.json(tweets)
})

app.get('/tweets/:id', (request, response) => {
    const id = request.params.id
    const tweet = tweets.find(tweet => tweet.id.toString() === id)

    if (tweet) {    
        response.json(tweet)  
    } else {    
        response.status(404).end()  
    } 
})

app.delete('/tweets/:id', (request, response) => {
    const id = Number(request.params.id)
    tweets = tweets.filter(user => user.id !== id)
  
    response.status(204).end()
})

app.post('/tweets', (request, response) => {
    console.log('ss')
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
    
    console.log('aaa')
      const tweet = {
        content: body.content,
        date: new Date(),
        id: generateTweetID(),
        userID: body.userID,
      }
    
      tweets = tweets.concat(tweet)
      response.json(tweets)

  })














const generateID = () => {
    const maxId = users.length > 0
    ? Math.max(...users.map(n => n.id))
    : 0
    return maxId + 1
}

const generateTweetID = () => {
  const maxId = tweets.length > 0
  ? Math.max(...tweets.map(n => n.id))
  : 0
  return maxId + 1
}


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})