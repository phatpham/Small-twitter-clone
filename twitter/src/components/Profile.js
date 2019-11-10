import React, { useState, useEffect} from 'react'
import User from './minorComponents/User'
import avatar from '../images/avatar.jpg'
import background from '../images/css-lattice-pattern.png'
import { Container , Row, Col, Form, FormControl, Button, NavItem, Navbar, Nav,} from 'react-bootstrap'

const Profile = ({user,followers,followings}) => {

    //Current page state
    const [page, setPage] = useState('profile')


    //Control which page gets display
    const  toPage = (page) => (event) => {
       event.preventDefault()
       setPage(page)
     }

    
    //Current account stage. and list of followers/followings
    const [currentAccount, setcurrentAccount] = useState(user)
    const [currentAccountFollowings, setcurrentAccountFollowings] = useState(followings)
    const [currentAccountFollowers, setcurrentAccountFollowers] = useState(followers)
     
    const listOfFollowings = () => {
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
    
    
    const listOfFollowers = () => {
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
   
    const bio = () => {
        return(
        <div style={{backgroundImage:{background}}}>
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
            <Container>
                <Row>
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
                            {currentAccount.name}
                            <p>Joined {currentAccount.date}</p>
                            <p>{currentAccountFollowings.length} followings</p>
                            <p>{currentAccountFollowers.length} followers</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    List of followers
                    {listOfFollowers}
                    </Col>
                    <Col>
                    List of followings
                    {listOfFollowings}
                    </Col>
                    <Col>
                    You might want to follow
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }

    return (
        <div>
        {bio()}
        </div>
    )
}

export default Profile