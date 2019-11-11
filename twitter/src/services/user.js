import axios from 'axios'

//Base location of database
const baseUrl = 'http://localhost:3001/users'

//Set token
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

//Get all users
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

//Post request
const create = async newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

//Send PUT request on object with this id
const update = (newObject) => {
  const request = axios.put(`${baseUrl}`, newObject)
  return request.then(response => response.data)
}

//Get user
const getUser = (userId) => {
  const request = axios.get(`${baseUrl}/${userId}`)
  return (
    request
    .then(response => response.data)
  )
}

export default { getAll, create, update , getUser , setToken}