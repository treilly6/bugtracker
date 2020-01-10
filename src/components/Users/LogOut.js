import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../App.css'

class LogOut extends React.Component {

    state = {}

    click = (e) => {
        axios.get('/api/user/logout')
            .then((res) => {
                console.log("here the res thing");
                console.log(res);
                console.log(this.props);
                console.log("ABOIVE IS THE PROPS");
                if (res.data.redirect) {
                    window.location = res.data.redirect;
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                <span className="navLink hoverLink" onClick={this.click}>Log Out</span>
            </React.Fragment>
        )
    }
}

export default LogOut;
