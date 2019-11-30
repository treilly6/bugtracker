import React from 'react';
import { Link } from 'react-router-dom';
import UserHandler from '../Users/UserHandler';
import axios from 'axios';

class Header extends React.Component {

    state = {
        authenticated : false,
        user : '',
        dataFetched : false,
    }

    constructor(props) {
        super(props);
        console.log("HEADER PROPS CONTRUCTOR");
        console.log(props);
        axios.post('/api/auth')
            .then(res => {
                console.log("AXIOS RESULT USER HANDLER");
                console.log(res);
                if (res.data.authenticated) {
                    this.setState({authenticated:true, user:res.data.user, dataFetched:true});
                } else {
                    this.setState({dataFetched : true});
                }
                console.log("CHECKING THE STATE");
                console.log(this.state);
            })
            .catch(err => console.log(err))
    }

    render() {
        if(!this.state.dataFetched) {
            return null;
        } else {
            var links;
            if(this.state.authenticated) {
                links =
                <div>
                    <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link> | <Link style={linkStyle} to="/projects">Projects</Link>
                </div>;
            } else {
                links =
                <div>
                    <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
                </div>;
            }
            console.log("BEFORE THE RENDER RETURN links");
            console.log(links);
            return(
                <header style = {headerStyle}>
                    <h1 style={{marginBottom : "5px"}}>Project Management</h1>
                    <UserHandler authenticated={this.state.authenticated} user={this.state.user}></UserHandler>
                    {links}
                </header>
            )
        }

    }
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
