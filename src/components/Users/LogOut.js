import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
                <button onClick={this.click}>Log Out</button>
            </div>

        )
    }
}

export default LogOut;
