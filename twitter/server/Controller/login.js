const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../Models/hero-model')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const theUser = await User.findOne({ username: body.username })
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  console.log(body.password)
  console.log(passwordHash)
  const passwordCorrect = theUser === null
    ? false
    : await bcrypt.compare(body.password, theUser.password )

  console.log(passwordCorrect)
  
  if (!(theUser && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: theUser.username,
    id: theUser.id,
  }

  const token = jwt.sign(userForToken, 'SUPER SECRET TOKEN')
  console.log(theUser)
  response
    .status(200)
    .send({ token, username: theUser.username, id: theUser.id, bio: theUser.bio, name : theUser.name, followings: theUser.followings, followedBy: theUser.followedBy, date:theUser.date})
})

module.exports = loginRouter