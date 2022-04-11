import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';


import Navigation from "./Navbar";

export const AddNotes = () => {
    const [note, addNote] = useState("")
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        const data = {
            note: note,
            status: status
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/addnote`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert("note cannot be empty")
                    navigate('/addnote')
                } else {
                    alert("Note added!")
                    console.log("Success: ", data)
                }
            })
            .catch(error => console.log("Error: ", error))
        navigate('/mynotes')
    }
    return (
        <>
            <Navigation />
            <Form className="form">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Hey, you got this :) </Form.Label>
                    <Form.Control className="textarea" name="addNote"
                        type="text"
                        //id="CommentsOrAdditionalInformation"
                        value={note}
                        onChange={e => addNote(e.target.value)}
                        as="textarea" rows={3} />
                </Form.Group>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Feature your note?"
                    onChange={e => setStatus(e.target.checked)}
                />
                <Button className='custom' onClick={handleSubmit}>Create Note</Button>
            </Form>
        </>
    )
}