import { React, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { Button } from 'react-bootstrap'



export default function LogoutButton() {
    const navigate = useNavigate()
    function logout() {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <Button onClick={logout} className="custom">Logout</Button>
    )
}