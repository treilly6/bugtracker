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
            var userBox;
            if(this.state.authenticated == true) {
                userBox =
                    <div style={userDiv}>
                        <h3 style={{paddingRight: "5px"}}><FontAwesomeIcon icon="user" /><span>{this.state.user}</span></h3>
                        <div>
                            <LogOut setParentState={this.clearState.bind(this)}></LogOut>
                        </div>

                    </div>;
            } else {
                userBox =
                <div style={userDiv}>
                    <Link to="/signup" className="hoverLink" style={noPadLinkStyle}><div>Sign Up</div></Link>
                    <Link to="/login" className="hoverLink" style={noPadLinkStyle}><div>Log in</div></Link>
                </div>;
            }

            return (
                <React.Fragment>
                    <div style={{marginTop : "5px"}}>
                        {userBox}
                    </div>
                    <Nav userAuthenticated={this.state.authenticated}/>
                </React.Fragment>
            )
        }
    }
}

const userDiv = {
    display : "flex",
    justifyContent : "flex-end",
    flexWrap : "wrap-reverse",
}

const noPadLinkStyle = {
    textDecoration : "none",
    color : "#fff",
    padding : "0px 10px",
}

export default UserHandler;
