import { React, useState } from 'react';
import { useFormik } from 'formik';
import { JournalText } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

import { Loading } from "./SpinningLoader";

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required!';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required!';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }
    if (!values.username) {
        errors.username = 'Required!';
    } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required!';
    } else if (values.password.length < 5) {
        errors.password = 'Must be up to 5 characters';
    }
    if (!values.retypePassword) {
        errors.retypePassword = 'Required!';
    } else if (values.password !== values.retypePassword) {
        errors.retypePassword = 'Passwords do not match';
    }

    return errors;
};

export default function SignupForm() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState({
        load: false,
        disable: false
    })
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            retypePassword: ''
        },
        validate,
        onSubmit: values => {
            const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                password: values.password,
                retypePassword: values.retypePassword
            };
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
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(data => data.json())
                .then(data => {
                    alert(data.msg);
                    if (data.msg === 'Registered Successfully') {
                        navigate('/login')
                    }
                })
                .catch((error) => {
                    alert(error)
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
            <form className="form" onSubmit={formik.handleSubmit}>
                <input
                    placeholder="First Name"
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error">{formik.errors.firstName}</div>
                ) : null}
                <br />
                <input
                    placeholder="Last Name"
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error">{formik.errors.lastName}</div>
                ) : null}
                <br />
                <input
                    placeholder="Username"
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="error">{formik.errors.username}</div>
                ) : null}
                <br />
                <input
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
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
                <input
                    placeholder="Retype Password"
                    id="retypePassword"
                    name="retypePassword"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.retypePassword}
                />
                {formik.touched.retypePassword && formik.errors.retypePassword ? (
                    <div className="error">{formik.errors.retypePassword}</div>
                ) : null}
                <br />
                <button disabled={loading.disable} type="submit">SUBMIT</button>
                <br />
                {loading.load ? <Loading /> : null}
            </form>
        </>
    );
};