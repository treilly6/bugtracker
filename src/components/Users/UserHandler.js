import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LogOut from './LogOut';
import axios from 'axios';
import Nav from  '../layout/Nav';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    }

    componentDidMount() {
        console.log("MOUNT OF THE USER HANDLER");
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
            var userBox;
            var divStyle = {};
            var username = this.state.user.username || this.state.user.name;
            if(this.state.authenticated == true) {
                userBox =
                    <div className="userLogOut" style={userDiv}>
                        <h3 style={{paddingRight: "5px"}}><FontAwesomeIcon icon="user" /><span>{username}</span></h3>
                        <div><LogOut></LogOut></div>

                    </div>;
            } else {
                userBox =
                <div style={userDiv}>
                    <Link to="/signup" className="hoverLink" style={noPadLinkStyle}><div>Sign Up</div></Link>
                    <Link to="/login" className="hoverLink" style={noPadLinkStyle}><div>Log in</div></Link>
                </div>;
                divStyle = noAuthStyle;
            }

            return (
                <div className={(this.state.authenticated ? "userNavCont" : "")} style={divStyle}>
                    <div style={{marginTop : "5px"}}>
                        {userBox}
                    </div>
                    <Nav userAuthenticated={this.state.authenticated} username={username} />
                </div>
            )
        }
    }
}

const userDiv = {
    justifyContent : "flex-end",
    flexWrap : "wrap-reverse",
}

const noPadLinkStyle = {
    textDecoration : "none",
    color : "#fff",
}

const noAuthStyle = {
    position: "absolute",
    right: "10px",
    bottom: "10px",
}

export default UserHandler;
