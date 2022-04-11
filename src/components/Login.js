import { React } from 'react';
import { useNavigate } from "react-router-dom";

import { useFormik } from 'formik';


import { Navbar, Container, Nav } from 'react-bootstrap'


const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 5) {
        errors.password = 'Must be up to 5 characters';
    }

    return errors;
};

export default function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            const data = {
                username: values.username,
                password: values.password
            }
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    const token = localStorage.setItem("token", data.access_token)
                    const user = localStorage.setItem("user", data.username)
                    alert("Login Successful")
                    navigate('/notesfeed')
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
    });
    return (
        <>
            <Navbar className="color-nav" bg="" variant="">
                <Container>
                    <Navbar.Brand style={{ 'color': 'whitesmoke' }} href="/">Notels!</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link style={{ 'color': 'whitesmoke' }} href="/login">Login</Nav.Link>
                        <Nav.Link style={{ 'color': 'whitesmoke' }} href="/sign-up">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
                <button type="submit">Submit</button>
            </form>
        </>

    );
};