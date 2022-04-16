import { React } from 'react';
import { useNavigate } from 'react-router-dom'
import { BoxArrowLeft } from 'react-bootstrap-icons';
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
                'width': '100px',
                'margin-left': '20px',
                'float': 'right'
            }}
            onClick={logout}
            className=""
        >Logout   <BoxArrowLeft /></Button>
    )
}