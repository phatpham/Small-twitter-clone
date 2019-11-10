import React from 'react'
import Profile from './Profile'
import App from '../App'
import { BrowserRouter as Router , Route } from 'react-router-dom'
import { LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Form, FormControl, NavItem, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {

    const padding = {padding:5}

    return (
        <Router>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Twitter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <LinkContainer to="/profile">       
                    <NavItem>Profile</NavItem>
                </LinkContainer>
                <Route path="/profile" render={() => <Profile />} />
                
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </Router>
    )
}
export default Header