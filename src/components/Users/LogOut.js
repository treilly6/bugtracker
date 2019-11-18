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
                localStorage.clear();
            })
            .catch(err => console.log(err));
    }

    render() {

        return (
            <div>
                <button onClick={this.click}>Log Out</button>
            </div>

        )
    }
}

export default LogOut;
