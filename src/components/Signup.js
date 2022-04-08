import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const validate = values => {
    const errors = {};

    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    }
    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 5) {
        errors.password = 'Must be up to 5 characters';
    }
    if (!values.retypePassword) {
        errors.retypePassword = 'Required';
    } else if (values.password !== values.retypePassword) {
        errors.retypePassword = 'Passwords do not match';
    }

    return errors;
};

export default function SignupForm() {
    const navigate = useNavigate()
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
            fetch('api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    alert(error)
                    console.error('Error:', error);
                });
            alert("Registered Successfully")
            navigate('/login')

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
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div>{formik.errors.firstName}</div>
                ) : null}

                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div>{formik.errors.lastName}</div>
                ) : null}
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}

                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
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
                <label htmlFor="retypePassword">Retype Password</label>
                <input
                    id="retypePassword"
                    name="retypePassword"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.retypePassword}
                />
                {formik.touched.retypePassword && formik.errors.retypePassword ? (
                    <div>{formik.errors.retypePassword}</div>
                ) : null}

                <button type="submit">Submit</button>
            </form>
        </>
    );
};