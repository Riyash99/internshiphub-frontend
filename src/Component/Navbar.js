import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './images/03.png';
import './Navbar.css'

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-light bg-light custom-navbar">

            <span className="navbar-brand mb-0 h1">

                 <img src={logo} width="130" height="80" alt="" className="logo-container profile"/> 
            </span>
            <div>
                {location.pathname !== '/login' && (
                    <Link to="/login" className="custom-button">
                        <b>Login</b>
                    </Link>
                )}
                {location.pathname !== '/Reg' && (
                    <Link to="/Reg" className="custom-button">
                        <b>Register</b>
                    </Link>
                )}
                {location.pathname !== '/' && (
                    <Link to="/" className="custom-button">
                        <b>job</b>
                    </Link>
                )}

                {location.pathname !== '/post-job' && ( /* Add this condition for the "Post a Job" button */
                    <Link to="/post-job" className="custom-button">
                        <b>Post a Job</b>
                    </Link>
                )}



            </div>
        </nav>
    );
}

export default Navbar;
