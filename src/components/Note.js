import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import Navigation from './Navbar';

export default function Note() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/notesfeed`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response.msg === 'Token has expired') {
                    navigate('/login')
                } else {
                    console.log(response)
                    setNotes(response)
                }
            })
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Navigation />
            <Card.Header>Featured Notes</Card.Header>
            {notes.map(eachNote => {
                if (eachNote.can_view_records) {
                    return (
                        <Card key={eachNote.id}>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {' '}
                                        {eachNote.data}{' '}
                                    </p>
                                    <footer className="blockquote-footer">
                                        {eachNote.owner}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    )
                } else if (notes.length < 1) {
                    return (
                        <Card key={eachNote.id}>
                            <Card.Body>Sorry, no stories to see at this time.</Card.Body>
                        </Card>
                    )
                }
            })}
        </>
    )
}
