import React, { useState, useEffect} from 'react'
import avatar from '../images/avatar.jpg'
import background from '../images/css-lattice-pattern.png'
import { Container , Row, Col, NavItem, Button, Navbar, Nav,} from 'react-bootstrap'
import userService from '../services/user'
import Content from './Content'

const Profile = ({user, displayUser}) => {

    //Current page state
    const [page, setPage] = useState('profile')


    //Control which page gets display
    const  toPage = (page) => (event) => {
       event.preventDefault()
       setPage(page)
     }
    
    const [currentDisplayUser, setDisplayUser] = useState(displayUser)
    const newProf = (newDisplay) =>  {
        const handler= () => {
            console.log(user)
            setDisplayUser(newDisplay)
        }
        return handler
    }
 
    
     //Back to home page
     const home = () => {
        return <Content currentUser={user}/>
    }

    
    //Current account stage. and list of followers/followings
    const [currentDisplayUserFollowings, setcurrentDisplayUserFollowings] = useState([{id:-1}])
    const [currentDisplayUserFollowers, setcurrentDisplayUserFollowers] = useState([{id:-1}])
    const [currentDisplayUserNotFollowings, setcurrentDisplayUserNotFollowings] = useState([{id:-1}])
    
    useEffect(() => {  
        userService
        .getAll()
        .then(users => users.filter(user => 
            currentDisplayUser.followings.includes(user.id)
        ))
        .then(response => {
            setcurrentDisplayUserFollowings(response)

        }).catch(error =>
            console.log('fail')    
        )
        

        userService
        .getAll()
        .then(users => 
            users.filter(
                user => currentDisplayUser.followedBy.includes(user.id)
            )
        )
        .then(response => 
            setcurrentDisplayUserFollowers(response)
        ).catch(error =>
            console.log('fail')    
        )

        userService
        .getAll()
        .then(users => 
            users.filter(
                user => !(currentDisplayUser.followings.includes(user.id))
            )
        )
        .then(response => 
            setcurrentDisplayUserNotFollowings(response)
        ).catch(error =>
            console.log('fail')    
        )
    }, [currentDisplayUser])


    
    const listOfFollowings = () => {
        const cont = [...currentDisplayUserFollowings].map(following =>
                <li className='user'>
                    <a href="#" onClick={newProf(following)} >{following.name}</a>
                </li>
        )

        return (
            <div>
                <p> List of following users</p>
                <ul>{cont}</ul>
            </div>
        )
    }
    
    
    const listOfFollowers = () => {
        const cont = [...currentDisplayUserFollowers].map(follower =>
                <li className='user'>
                    <a href="#" onClick={newProf(follower)} >{follower.name}</a>
                </li>
        )

        return (
            <div>
                <p>List of users following you</p>
                <ul>{cont}
                </ul>
            </div>
        )
    }
    
    const suggestFollowing = () => {
        const cont = [...currentDisplayUserNotFollowings].map(follower =>
            <li className='user'>
                <a href="#" onClick={newProf(follower)} >{follower.name}</a>
            </li>
    )

    return (
        <div>
            <p>List of users you are currently not following</p>
            <ul>{cont}
            </ul>
        </div>
    )
    }
    
    const followButton = () => {
        const addFollow = () => {
            userService.update({...user, followings: user.followings.concat(currentDisplayUser.id)})
            userService.update({...currentDisplayUser, followedBy: currentDisplayUser.followedBy.concat(user.id)})
        }
        return (
            <Button onClick={addFollow}>
                Follow
            </Button>
        )
    }
    const bio = () => {
        return(
        <div style={{backgroundImage:{background}}}>
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
                    <p style={{padding:3}} >Logged In User: {user.name}</p>
                </NavItem>
                </Nav>

            </Navbar.Collapse>
            </Navbar>
        </div>
            <Container>
                <Row >
                    <Col>
                        <Row >
                            <p style = {{textAlign:'center'}}>Avatar</p>
                        </Row>
                        
                        <Row>
                            <img src={avatar} width='70%' style={{borderRadius:'30%'}}></img>
                        </Row>
                    </Col>
                    <Col>
                        <div>
                            {currentDisplayUser.name}
                            <p>Joined {currentDisplayUser.date}</p>
                            <p>{currentDisplayUserFollowings.length} followings</p>
                            <p>{currentDisplayUserFollowers.length} followers</p>
                            {user.id !== currentDisplayUser.id && !(user.followings.includes(currentDisplayUser.id)) && followButton()}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {listOfFollowers()}
                    </Col>
                    <Col>
                    {listOfFollowings()}
                    </Col>
                    <Col>
                    {suggestFollowing()}
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }

    return (
        <div>
        {page === 'profile'? bio():home()}
        
        </div>
    )
}

export default Profile