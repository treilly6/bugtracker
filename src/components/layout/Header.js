import React from 'react';
import { Link } from 'react-router-dom';
import UserHandler from '../Users/UserHandler';
import axios from 'axios';

class Header extends React.Component {

    state = {}

    render() {
        return(
            <header style = {headerStyle}>
                <h1 style={brandStyle}>BugTracker</h1>
                <div>
                    <UserHandler></UserHandler>
                </div>                
            </header>
        )
    }
}

const headerStyle = {
    backgroundColor : "#333",
    color : "#fff",
    paddingLeft : "15px",
    height : "100px",
    textAlign : "center",
    display : "flex",
    justifyContent : "space-between",
    position : "relative",
}


const brandStyle = {
    alignSelf : "center",
}

export default Header;
