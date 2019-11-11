import React, { useState, useEffect } from 'react'
import Timeline from './minorComponents/Timeline'
import Profile from './Profile'
import { Container , Row, Col, Form, Button, NavItem, Navbar, Nav,} from 'react-bootstrap'
import userService from '../services/user'
import tweetService from '../services/tweet'
import '../styling/Content.css'

const Content = ({ currentUser }) => {

    const [page, setPage] = useState('home')

    const toPage = (page) => (event) => {
       event.preventDefault()
       setPage(page)
     }

    const [currentAccount, setcurrentAccount] = useState(currentUser)

    
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
    
    //Get list of suitable tweets to display
    useEffect(() => {  
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
            .catch(err => console.log('error here'))
          })
      }

      const handleStatusChange = (event) => {
        setNewTweet(event.target.value)
      }

    const Home = () => {
        return (
            <div>
            <div>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Twitter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav >
                <NavItem style={{padding:3}}>
                    <a href="" onClick={toPage('profile')} style={{color:'black'}} >Profile   </a>
                </NavItem>
                <NavItem>
                    <p style={{padding:3}} >Logged In User: {currentAccount.name}</p>
                </NavItem>
                </Nav>

            </Navbar.Collapse>
            </Navbar>
        </div>

        
        <div>
        <Container fluid='true'>
            <Row>

                <Col className = "sides"></Col>            
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

    const body = () => {
        if (page === 'home') {
          return <Home />
        } else if (page === 'profile') {
            return <Profile user={currentAccount} displayUser={currentAccount}/>
        } 
    }

    return (
        <div>
            {body()}
        </div>
    )
}

export default Content