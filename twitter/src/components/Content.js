import React, { useState, useEffect } from 'react'
import Timeline from './minorComponents/Timeline'
import { Container , Row, Col, Form, FormControl, Button} from 'react-bootstrap'
import userService from '../services/user'
import tweetService from '../services/tweet'
import User from './minorComponents/User'
import '../styling/Content.css'

const Content = () => {

    const [currentAccount, setcurrentAccount] = useState({id:3})
    const [currentAccountFollowings, setcurrentAccountFollowings] = useState([])
    const [currentAccountFollowers, setcurrentAccountFollowers] = useState([])
    const [displayTweets, setDisplayTweets] = useState([])
    const [newTweet, setNewTweet] = useState('')
  
    //Make sure page is re-rendered after the site has received that data
    useEffect(() => {

        userService
        .getUser(1)
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
        .then(users => users.filter(
            user => currentAccount.followedBy.includes(user.id)
        ))
        .then(response => {
            setcurrentAccountFollowers(response)
        }).catch(error =>
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
    const theUser2 = () => {
        const cont = [...currentAccountFollowings].map(following =>
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
        const cont = [...currentAccountFollowers].map(followers =>
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
                
                    <Row>{theUser2()}</Row>
                    <Row>{theUser3()}</Row>
                
                </Col>   
            </Row>
        </Container>
    )
}

export default Content