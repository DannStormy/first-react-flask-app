import { Navbar, Container, Nav } from 'react-bootstrap'
import { React } from 'react';

import LogoutButton from './LogoutButton';

export default function Navigation() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="color-nav">
                <Container className="nav-links">
                    <Navbar.Brand style={{ 'color': '#9e834b' }} href="/">NOTELL!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav fill variant="tabs" className="me-auto">
                            <Nav.Link style={{ 'color': '#9e834b' }} href="/notesfeed">FEED</Nav.Link>
                            <Nav.Link style={{ 'color': '#9e834b' }} href="/mynotes">MY-NOTES</Nav.Link>
                            <Nav.Link style={{ 'color': '#9e834b' }} href="/addnote">ADD NOTE</Nav.Link>
                        </Nav>
                        <Navbar.Text className="justify-content-end">
                            <a style={{ 'color': '#9e834b' }} href="/login">Hello, {localStorage.getItem("user")}</a>
                        </Navbar.Text>
                        <LogoutButton />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}