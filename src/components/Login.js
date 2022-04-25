import { React } from 'react';

import { useNavigate } from "react-router-dom";

import { useFormik } from 'formik';

import { JournalText } from 'react-bootstrap-icons';
import { Navbar, Container, Nav } from 'react-bootstrap'


const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required!';
    } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    }
    if (!values.password) {
        errors.password = 'Required!';
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
                    localStorage.setItem("token", data.access_token)
                    localStorage.setItem("user", data.username)
                    alert(data.msg);
                    if (data.msg === 'Login Successful') {
                        navigate('/notesfeed')
                    }
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
                    <Navbar.Brand style={{ 'color': '#463932' }} href="/">N<JournalText style={{ 'display': 'inline-block' }} width="4.5%" height="4.5%" color="#463932" />TELL!</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link style={{ 'color': '#463932' }} href="/login">LOGIN</Nav.Link>
                        <Nav.Link style={{ 'color': '#463932' }} href="/sign-up">REGISTER</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <form className='form' onSubmit={formik.handleSubmit}>
                <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
                <br />
                <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
                <br />
                <button type="submit">LOGIN</button>
            </form>
        </>

    );
};