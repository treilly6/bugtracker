import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class LogIn extends React.Component {

    state = {}

    render() {

        return (
            <div>
                <h2>Log In</h2>
                <form>
                    <input type="text" name="username" />
                    <input type="password" name="password" />
                    <button>Sign Up</button>
                </form>
            </div>

        )
    }
}

export default LogIn;
