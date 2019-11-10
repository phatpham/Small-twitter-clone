import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content'
import userService from './services/user'
import loginServ from './services/login'
const App = () => {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState({id:-1})


  //Need changes
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userr = await loginServ.login({
        username, password
      })

      console.log(userr)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(userr)
      ) 
      userService.setToken(userr.token)
      console.log(userr)
      setUser(userr)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //To implement
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>   
    )  
  }

  const displayContent = (user) => {
    console.log(user)
    return (
      <Content currentUser={user}/>
    )
  }

  return (
    <div>
      {user.id === -1 ? loginForm() : displayContent(user) }
    </div>
  )
}

export default App;
