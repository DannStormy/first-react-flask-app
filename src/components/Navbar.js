import { Navbar, Container, Nav } from 'react-bootstrap'
import { JournalText } from 'react-bootstrap-icons';
import { React, useState } from 'react';

import LogoutButton from './LogoutButton';

export default function Navigation() {
    const [currentTime] = useState({
        hour: new Date().getHours(),
        user: localStorage.getItem("user")
    })
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="color-nav">
                <Container className="nav-links">
                    <Navbar.Brand style={{ 'color': '#463932' }} href="/">N<JournalText color="#463932" />TELL!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav fill variant="tabs" className="me-auto">
                            <Nav.Link style={{ 'color': '#463932' }} href="/notesfeed">FEED</Nav.Link>
                            <Nav.Link style={{ 'color': '#463932' }} href="/mynotes">MY-NOTES</Nav.Link>
                            <Nav.Link style={{ 'color': '#463932' }} href="/addnote">ADD NOTE</Nav.Link>
                        </Nav>
                        <Navbar.Text className="justify-content-end">
                            <a style={{ 'color': '#463932' }} href="/login">{currentTime.hour < 12 ? "Good morning"
                                : currentTime.hour < 18 ? "Good afternoon"
                                    : "Good evening"}, {currentTime.user}</a>
                        </Navbar.Text>
                        <LogoutButton />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}