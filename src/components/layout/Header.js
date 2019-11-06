import React from 'react';

function Header() {
    return (
        <header>
            <h1 style = {headerStyle}>Project Management</h1>
        </header>
    )
}

const headerStyle = {
    backgroundColor : "#333",
    color : "#fff",
    padding : "15px",
    textAlign : "center",
}

export default Header;
