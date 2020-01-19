import React from 'react';
import { Link } from 'react-router-dom';
import UserHandler from '../Users/UserHandler';
import axios from 'axios';

class Header extends React.Component {

    state = {}

    constructor(props){
        super(props);
    }

    homeRedirect = () => {
        window.location = '/';
    }

    render() {
        console.log("HEADER RENDER HERE ARE THE PROPS");
        console.log(this.props);
        return(
            <header style = {headerStyle}>
                <h1 style={brandStyle} onClick={this.homeRedirect}>BugTracker</h1>
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
    fontSize : "1.8em",
}

export default Header;
