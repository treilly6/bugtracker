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
        axios.post('/api/user/login', {"username": this.state.username, "password" : this.state.password})
            .then((res) => {
                console.log(res.data);
                if(res.data.redirect) {
                    // handle a successful Login
                    console.log("in if redirect");
                    console.log(res.data.redirect);
                    localStorage.setItem('authenticated', true);
                    // window.location = res.data.redirect;
                } else {
                    // handle an unseccessful login
                    console.log("not a valid login");
                    console.log(res.data.error)
                }
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
