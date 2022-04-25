import { Navbar, Container, Nav } from 'react-bootstrap'
import { JournalText } from 'react-bootstrap-icons';
import { React } from 'react';

import LogoutButton from './LogoutButton';

export default function Navigation() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="color-nav">
                <Container className="nav-links">
                    <Navbar.Brand style={{ 'color': '#463932', 'fontSize': '18px' }} href="/">N<JournalText width="4.5%" height="4.5%" color="#463932" />TELL!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav fill variant="tabs" className="me-auto">
                            <Nav.Link style={{ 'color': '#463932' }} href="/notesfeed">FEED</Nav.Link>
                            <Nav.Link style={{ 'color': '#463932' }} href="/mynotes">MY-NOTES</Nav.Link>
                            <Nav.Link style={{ 'color': '#463932' }} href="/addnote">ADD NOTE</Nav.Link>
                        </Nav>
                        <Navbar.Text className="justify-content-end">
                            <a style={{ 'color': '#463932' }} href="/login">Hello, {localStorage.getItem("user")}</a>
                        </Navbar.Text>
                        <LogoutButton />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}