import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LogOut from './LogOut';
import axios from 'axios';

class UserHandler extends React.Component {

    state = {
        authenticated : false,
        user : '',
        dataFetched : false,
    }

    constructor(props) {
        super(props);
        console.log("CONTSTRUCTOR OF THE USER HANDLER PAGE");
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

    clearState() {
        this.setState({authenticated : false, user : '', dataFetched : false});
    }

    componentDidMount() {
        console.log("MOUNT OF THE USER HANDLER");
    }

    render() {
        // Add some kind of logic here that will change what the output is based on whether the user is loged in or not
        if(!this.state.dataFetched) {
            return null;
        } else {
            var links;
            var userBox;
            if(this.state.authenticated == true) {
                userBox =
                    <div style={userDiv}>
                        <h3 style={{padding: "0px 15px"}}>Welcome {this.state.user}</h3>
                        <LogOut setParentState={this.clearState.bind(this)}></LogOut>
                    </div>;
                links =
                <div>
                    <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link> | <Link style={linkStyle} to="/projects">Projects</Link>
                </div>;
            } else {
                userBox =
                <div style={userDiv}>
                    <Link to="/signup" style={noPadLinkStyle}><div>Sign Up</div></Link>
                    <Link to="/login" style={noPadLinkStyle}><div>Log in</div></Link>
                </div>;
                links =
                <div>
                    <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
                </div>;
            }

            return (
                <React.Fragment>
                    {links}
                    <div style={{padding : "10px 0px"}}>
                        {userBox}
                    </div>
                </React.Fragment>
            )
        }
    }
}

const userDiv = {
    display : "flex",
    justifyContent : "flex-end",
}

const linkStyle = {
    textDecoration : "none",
    color : "#fff",
    padding : "10px",
}

const noPadLinkStyle = {
    textDecoration : "none",
    color : "#fff",
    padding : "0px 10px",
}

export default UserHandler;
