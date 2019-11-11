import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Row, Col } from 'react-bootstrap'
import Content from './components/Content'
import userService from './services/user'
import loginServ from './services/login'
const App = () => { 
  document.body.style.backgroundColor = "	#F5F5DC";

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState({id:-1})

  const [nameRegister, setNameRegister] = useState('')
  const [usernameRegister, setUsernameRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState('')

  const [errorNotification, setErrorNotification] =useState('')
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
      notification('Wrong login details')
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    console.log('aa')
    try { 
        await userService.create({username:usernameRegister, password:passwordRegister, name: nameRegister})
        setUsernameRegister('')
        setPasswordRegister('')
        setNameRegister('')
        notification('Account created. Please log in')
      } catch (exception) {
       notification('Username taken')
    }

  }

  const notification = (error) => {
    setErrorNotification(error)
  }

  const loginForm = () => {
    const login = () => {
      return (
        <div>
        <p>Login to your account</p>
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
      </div>   
      )
    }

    const errorDisplay = () => {
      return (
        <Alert variant='danger'>
            {errorNotification}
          </Alert>
      )
    }

    const register = () => {
      return(
      <form onSubmit={handleRegister}>
        Register a new account
        <div>
          username
            <input
            type="text"
            value={usernameRegister}
            name="Username"
            onChange={({ target }) => setUsernameRegister(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={passwordRegister}
            name="Password"
            onChange={({ target }) => setPasswordRegister(target.value)}
          />
        </div>
        <div>
          name
            <input
            type="text"
            value={nameRegister}
            name="name"
            onChange={({ target }) => setNameRegister(target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>   
      )
    }
    return (
      <div>
        <Container>
          <Row>
            <h3 style={{alignContent:'center', width:'50%'}}>Twitter clone</h3>
          </Row>
          <Row>
            <Col>
            {login()}
            </Col>
            <Col>
            {register()}
            </Col>
          </Row>
        </Container>

        {errorNotification !== '' && errorDisplay()}
      </div>
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
