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
        <Button style=
            {{
                'backgroundColor': '#463932',
                'border': '0',
                'color': '#9e834b',
                'width': '70px',
                'margin-left': '20px',
                'float': 'right'
            }}
            onClick={logout}
            className=""
        >Logout</Button>
    )
}