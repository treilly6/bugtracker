import React from 'react';
import { Link } from 'react-router-dom';
import UserHandler from '../Users/UserHandler';

function Header() {
    return (
        <header style = {headerStyle}>
            <h1 style={{marginBottom : "5px"}}>Project Management</h1>
            <UserHandler></UserHandler>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link> | <Link style={linkStyle} to="/projects">Projects</Link>
        </header>
    )
}

const linkStyle = {
    textDecoration : "none",
    color : "#fff",
    padding : "10px",
}

const headerStyle = {
    backgroundColor : "#333",
    color : "#fff",
    padding : "15px",
    textAlign : "center",
}

export default Header;
