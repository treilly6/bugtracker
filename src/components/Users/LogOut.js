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
                    console.log("GONNA INVOKE SET PARENT STATE");
                    this.props.setParentState({authenticated : false, user : '', dataFetched : false});
                    window.location = res.data.redirect;
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div style={{alignSelf:"center"}}>
                <span className="navLink hoverLink" onClick={this.click} style={{fontSize : ".65em", paddingRight : "5px"}}>Log Out</span>
            </div>

        )
    }
}

export default LogOut;
