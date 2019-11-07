import axios from 'axios'

//Base location of database
const baseUrl = 'http://localhost:3001/tweets'

//Get all users
const getAllTweet = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

//Post request
const createTweet = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

//Send PUT request on object with this id
const updateTweet = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

//Get tweet
const getTweet = (tweetId) => {
  const request = axios.get(`${baseUrl}/${tweetId}`)
  return (
    request
    .then(response => response.data)
  )
}

export default { getAllTweet, createTweet, updateTweet , getTweet }