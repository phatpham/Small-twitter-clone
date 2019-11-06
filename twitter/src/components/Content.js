import React, { useState, useEffect } from 'react'
import Items from './minorComponents/Items'
import StatusAdder from './minorComponents/StatusAdder'
import { Container , Row} from 'react-bootstrap'
import userService from '../services/user'
import User from './minorComponents/User'

const Content = () => {

    const [users, setUser] = useState(["bell"])

    //Make sure page is re-rendered after the site has received that data
    useEffect(() => {
        userService
        .getAll()
        .then(response => {
            console.log(response)
            setUser(response)
        })
        .catch(error => {
            console.log('fail')
          })
    }, [])


    //Display list of users
    const rows = () => users.map(user =>
        <ul>
            <User
            key={user.id}
            user={user}
            />
        </ul>
      )
    

    return (
        <Container>
            <Row>
                {rows()}
            </Row> 
            <Row className="justify-content-md-center">
                <StatusAdder />
                <Items />
            </Row>
            <Row></Row>
        </Container>
    )
}

export default Content