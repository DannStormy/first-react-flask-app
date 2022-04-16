import { React } from 'react';

import Login from './components/Login';
import SignupForm from './components/Signup';
import Note from './components/Note';
import PersonalNotes from './components/PersonalNotes';
import { Homepage } from './components/Homepage';
import { DisplayError } from './components/Error.js';
import { AddNotes } from './components/AddNotes';
import { NotFound } from './components/NotFound';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';







export default function AllRoutes() {
    const token = localStorage.getItem("token")
    console.log("Token from Routes is: " + token)

    return (
        <Router>
            <Routes>
                <Route element={<DisplayError token={token} />}>
                    <Route path="addnote" element={<AddNotes />} />
                    <Route path="mynotes" element={<PersonalNotes />} />
                </Route>
                <Route path="/" element={<Homepage />} />
                <Route path="notesfeed" element={<Note />} />
                <Route path="sign-up" element={<SignupForm />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Navigate to="login" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
} 
