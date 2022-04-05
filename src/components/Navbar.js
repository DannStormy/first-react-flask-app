import { Navbar, Container, Nav } from 'react-bootstrap'
import { React, useContext, useEffect } from 'react';
import { LoginContext } from '../contexts/LoginContext';

import LogoutButton from './LogoutButton';

export default function Navigation() {
    const [loginData, setLoginData] = useContext(LoginContext);
    return (
        <>
            <Navbar className="color-nav" bg="" variant="">
                <Container>
                    <Navbar.Brand style={{ 'color': 'whitesmoke' }} href="/">Notels!</Navbar.Brand>
                    <Nav fill variant="tabs" className="me-auto">
                        <Nav.Link style={{ 'color': 'whitesmoke' }} href="/notesfeed">Feed</Nav.Link>
                        <Nav.Link style={{ 'color': 'whitesmoke' }} href="/mynotes">My-Notes</Nav.Link>
                        <Nav.Link style={{ 'color': 'whitesmoke' }} href="/addnote">Add Note</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text >
                            <a style={{ 'color': 'whitesmoke' }} href="/login">Signed in as: {localStorage.getItem("user")}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
                <LogoutButton />
            </Navbar>
        </>
    )
}