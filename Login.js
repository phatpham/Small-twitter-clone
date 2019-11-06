import React, {useState, useEffect} from 'react'
import loginService from '../services/loginService'
import timelineservice from '../services/timelineservice'
const Login = () => {

    const [username, setUsername] = useState('')   
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    //Function for handling error
    

    //Function for handling login
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,password,
            })

            //Keep user logged in on re-render
            window.localStorage.setItem(        
                'loggedUser', JSON.stringify(user)      
            ) 
            timelineservice.setToken(user.token)


            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            
        }
    }

    
    return (
        <div>
            <h1>Notes</h1>

            

            <h2>Login</h2>

            <form onSubmit={handleLogin}>        
                <div>
                    username            
                    <input type="text" value={username} name="Username"  
                        onChange={({ target }) => setUsername(target.value)} />        
                </div>        
                <div>       
                    password 
                    <input type="password" value={password} name="Password" 
                        onChange={({ target }) => setPassword(target.value)}  />
                </div>        
                <button type="submit">login</button>      
            </form>
        
        </div>
    )
}

export default Login