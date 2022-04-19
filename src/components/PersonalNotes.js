import { React, useEffect, useState } from 'react';
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
                if (response.msg === 'Token has expired') {
                    alert('Token has expired, login')
                    navigate('/login')
                } else {
                    setNotes(response)
                }
            })
        // eslint-disable-next-line
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
            <Card.Header className="card">Your Notes</Card.Header>
            {
                notes.length < 1 ? <Card>
                    <Card.Body>
                        No notes to see at this time
                        <Button style={{ 'float': 'right', 'backgroundColor': '#463932', 'border': '0' }} href="/addnote">Add One</Button>
                    </Card.Body>
                </Card> : notes.map(eachNote => {
                    return (
                        <Card key={eachNote.id}>
                            <ListGroup variant="flush">
                                <ListGroup.Item style={{ 'backgroundColor': '#ede5df' }}>
                                    {eachNote.data}
                                    <button
                                        className="button"
                                        style={{ 'width': '2rem', 'float': 'right', 'border': '1px solid #f44336', 'padding': '5px' }}
                                        onClick={() => { deleteNote(eachNote.id) }}
                                        variant="">
                                        <Trash color="#f44336" />
                                    </button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    )
                })
            }
        </>
    )
}
