import React, { useState, useEffect } from 'react'
import Timeline from './minorComponents/Timeline'
import { Container , Row, Col, Form, FormControl, Button, NavItem, Navbar, Nav,} from 'react-bootstrap'
import userService from '../services/user'
import tweetService from '../services/tweet'
import User from './minorComponents/User'
import Profile from './Profile'
import '../styling/Content.css'

const Content = ({ currentUser }) => {

    const [page, setPage] = useState('home')

    const  toPage = (page) => (event) => {
       event.preventDefault()
       setPage(page)
     }

    const [currentAccount, setcurrentAccount] = useState(currentUser)
    const [currentAccountFollowings, setcurrentAccountFollowings] = useState([])
    const [currentAccountFollowers, setcurrentAccountFollowers] = useState([])
    
    const [displayTweets, setDisplayTweets] = useState([])
    const [newTweet, setNewTweet] = useState('')
  
    //Make sure page is re-rendered after the site has received that data
    useEffect(() => {

        userService
        .getUser(currentAccount.id)
        .then(response => {
            setcurrentAccount(response)
        })
        .catch(error => {
            console.log('error')
          })
        
        

    }, [])
    
    //NOT SCALABLE, NEED HEAVY REFACTORING
    useEffect(() => {  
        userService
        .getAll()
        .then(users => users.filter(user => 
                currentAccount.followings.includes(user.id)
        ))
        .then(response => {
            setcurrentAccountFollowings(response)

        }).catch(error =>
            console.log('fail')    
        )
        

        userService
        .getAll()
        .then(users => 
            users.filter(
                user => currentAccount.followedBy.includes(user.id)
            )
        )
        .then(response => 
            setcurrentAccountFollowers(response)
        ).catch(error =>
            console.log('fail')    
        )

        tweetService
        .getAllTweet()
        .then(tweets => 
            tweets.filter (tweet => 
                currentAccount.followings.concat(currentAccount.id).includes(tweet.userID))
        )
        .then(response => {
            setDisplayTweets(response)
        }).catch(error =>
            console.log('fail')    
        )

        console.log(currentAccountFollowers)
        console.log(currentAccountFollowings)

    }, [currentAccount])


    //add tweet by making post call to api
    const addTweet = (event) => {
        
        event.preventDefault()
        const tweetObject = {
          content: newTweet,
          date: new Date().toISOString(),
          userID: currentAccount.id
        }
        
        console.log("sssss")

        tweetService
          .createTweet(tweetObject)
            .then(postedTweet => {
            setDisplayTweets(displayTweets.concat(postedTweet))
            setNewTweet('')
          })
      }

      const handleStatusChange = (event) => {
        setNewTweet(event.target.value)
      }

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
        

    const Home = () => {
        return (
            <div>
            <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Twitter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavItem>Profile
                    <a href="" onClick={toPage('profile')} > Profile </a>
                </NavItem>
                
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </div>

        
        <div>
        <Container fluid='true'>
            <Row>

                <Col className = "sides">{theUser()}</Col>            
                <Col> 


                    <div className = 'center'>
                        <Form onSubmit={addTweet}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter your status</Form.Label>
                            <Form.Control as="textarea" rows="3" value={newTweet} onChange={handleStatusChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                        </Form>
                    </div>
                    

                    <Timeline tweets={displayTweets}/>
                </Col >
                <Col className = "sides">
                
                
                </Col>   
            </Row>
        </Container>
        </div>
        </div>
        )
    }

    const content = () => {
        if (page === 'home') {
          return <Home />
        } else if (page === 'profile') {
          return <Profile user={currentAccount} followers={currentAccountFollowers} followings={currentAccountFollowings}/>
        } 
    }

    return (
        <div>
            {content()}
        </div>
    )
}

export default Content