import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';


import Navigation from "./Navbar";
import { Loading } from "./SpinningLoader";
export const AddNotes = () => {
    const token = localStorage.getItem("token")
    const [note, addNote] = useState("")
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState({
        load: false,
        disable: false
    })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        const data = {
            note: note,
            status: status
        }
        setLoading({
            load: true,
            disable: true
        })
        setTimeout(() => {
            setLoading({
                load: false,
                disable: false
            })
        }, 5000);
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
                    //navigate('/addnote')
                } else {
                    alert("Note added!")
                    navigate('/mynotes')
                    console.log("Success: ", data)
                }
            })
            .catch(error => console.log("Error: ", error))
    }
    return (
        <>
            <Navigation />
            <Form className="form">
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{ 'color': '#ede5df' }}>Type something..</Form.Label>
                    <Form.Control className="textarea" name="addNote"
                        type="text"
                        //id="CommentsOrAdditionalInformation"
                        value={note}
                        onChange={e => addNote(e.target.value)}
                        as="textarea" rows={3} />
                </Form.Group>
                <Form.Check className="switch"
                    style={{ 'color': '#ede5df' }}
                    type="switch"
                    label="Feature note on feed"
                    id="custom-switch"
                    onChange={e => setStatus(e.target.checked)}
                />
                <Button
                    style={{
                        'backgroundColor': '#ede5df',
                        'border': '0',
                        'color': '#9e834b',
                        'fontSize': '14px'
                    }}
                    disabled={loading.disable}
                    onClick={handleSubmit}>CREATE NOTE</Button>
                <br />
                {loading.load ? <Loading /> : null}
            </Form>
        </>
    )
}