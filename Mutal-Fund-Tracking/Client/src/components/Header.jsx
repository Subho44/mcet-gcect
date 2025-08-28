import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const hl = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return <>
        <div>
            <h1>Mutal Funds</h1>
        </div>
        <div>
            <ul>
                <li><Link to="/">Register</Link></li>
                <li><Link to="/login">Login</Link></li>

                {
                    token && (
                        <>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/service">Service</Link></li>
                            <button onClick={hl}>Logout</button>
                        </>
                    )
                }

            </ul>
        </div>
    </>
}

export default Header