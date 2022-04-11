import { React, useContext, useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

import Navigation from './Navbar';

export default function Note() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/mynotes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.msg == 'Token has expired') {
                    navigate('/login')
                } else {
                    setNotes(response)
                }
            })
    }, [])
    function deleteNote(noteid) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete-note`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ noteid: noteid })
        })
            .then(response => response.json())
            .then(res => {
                if (res) {
                    window.location.reload();
                }
            })
    }

    return (
        <>
            <Navigation />
            <Card.Header>Your Notes</Card.Header>
            {
                notes.length < 1 ? <Card>
                    <Card.Body>
                        No notes to see at this time
                        <Button style={{ 'float': 'right' }} className='custom' href="/addnote">Add One</Button>
                        </Card.Body>
                </Card> : notes.map(eachNote => {
                    return (
                        <Card key={eachNote.id} style={{ 'width': '50rem' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    {eachNote.data}
                                    <Button
                                        style={{ 'width': '2rem', 'float': 'right' }}
                                        onClick={() => { deleteNote(eachNote.id) }}
                                        variant="">
                                        <Trash color="rgb(42, 141, 108)" />
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )
                })
            }
        </>
    )
}
