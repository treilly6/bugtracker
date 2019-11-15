import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class LogIn extends React.Component {

    state = {
        "username" : "",
        "password" : "",
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    submit = (e) => {
        e.preventDefault();
        axios.post('/api/user/login')
            .then((res) => {
                console.log(res);
                console.log("POST LOGIN")
            })
            .catch(err => console.log(err));
    }

    render() {

        return (
            <div>
                <h2>Log In</h2>
                <form onSubmit={this.submit}>
                    <input value={this.state.username} onChange={this.changeInput} type="text" name="username" />
                    <input value={this.state.password} onChange={this.changeInput} type="password" name="password" />
                    <button>Log in</button>
                </form>
            </div>

        )
    }
}

export default LogIn;
