import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class UserHandler extends React.Component {

    state = {}

    render() {
        // Add some kind of logic here that will change what the output is based on whether the user is loged in or not
        const userBox =
        <div>
            <Link to="/signup"><div>Sign Up</div></Link>
            <Link to="/login"><div>Log in</div></Link>
        </div>

        return (
            <div>
                {userBox}
            </div>

        )
    }
}

export default UserHandler;
