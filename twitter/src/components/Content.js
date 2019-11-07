import React, { useState, useEffect } from 'react'
import Items from './minorComponents/Items'
import StatusAdder from './minorComponents/StatusAdder'
import { Container , Row, Col} from 'react-bootstrap'
import userService from '../services/user'
import User from './minorComponents/User'
import '../styling/Content.css'

const Content = () => {

    const [currentAccount, setcurrentAccount] = useState({id:3})
    const [currentAccountFollowings, setcurrentAccountFollowings] = useState([])
    const [currentAccountFollowers, setcurrentAccountFollowers] = useState([])
    //Make sure page is re-rendered after the site has received that data
    useEffect(() => {

        userService
        .getUser(1)
        .then(response => {
            setcurrentAccount(response)
        })
        .catch(error => {
            console.log(error)
          })
        
        

    }, [])
    
    useEffect(() => {  
        userService
        .getAll()
        .then(users => users.filter(user => 
                currentAccount.followings.includes(user.id)
        ))
        .then(response => {
            setcurrentAccountFollowings(response)

        })
        .catch(error => console.log('fail'))


        userService
        .getAll()
        .then(users => users.filter(user => 
                currentAccount.followedBy.includes(user.id)
        ))
        .then(response => {
            setcurrentAccountFollowers(response)

        })
        .catch(error => console.log('fail'))


    }, [currentAccount])


    //Display user
    const theUser = () => {
        return(
            <ul>
            <User
                key={currentAccount.id}
                user={currentAccount}
            />

        </ul>
        )
    }  
    

    /*Testing purposes
        * showlist of followers and followings
    */
    const theUser2 = () => {
        const cont = currentAccountFollowings.map(following =>
            <ul>
                <User
                    key={following.id}
                    user={following}
                />
            </ul>
        )

        return (
            <div>
                <p> List of following users</p>
                <div>{cont}</div>
            </div>
        )
    }
    
        
    const theUser3 = () => {

        const cont = currentAccountFollowers.map(followers =>
            <ul>
                <User
                    key={followers.id}
                    user={followers}
                />
            </ul>
        )

        return (
            <div>
                <p>List of users following you</p>
                <div>{cont}</div>
            </div>
        )
    }
        
    return (
        <Container fluid='true'>
            <Row>

                <Col className = "sides">{theUser()}</Col>            
                <Col> 
                    <StatusAdder />
                    <Items />
                </Col >
                <Col className = "sides">
                
                    <Row>{theUser2()}</Row>
                    <Row>{theUser3()}</Row>
                
                </Col>   
            </Row>
        </Container>
    )
}

export default Content