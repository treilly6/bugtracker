import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SignUp extends React.Component {

    state = {
        "username" : "",
        "password" : "",
        "password2" : "",
    }

    submit = (e) => {
        e.preventDefault();
        const newUser = {
            "username" : this.state.username,
            "password" : this.state.password,
            "password2" : this.state.password2,
        }
        console.log(newUser);
        axios.post('/api/user/signup', newUser)
            .then((res) => {
                console.log("YEEET");
                console.log(res);
            })
            .catch((err) => {
                console.log("poopsdf");
                console.log(err);
            });
        console.log("OVER Man");
        this.setState({
            "username" : "",
            "password" : "",
            "password2" : "",
        });
        window.location.href = '/';
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.submit}>
                    <input onChange={this.changeInput} value={this.state.username} type="text" name="username" />
                    <input onChange={this.changeInput} value={this.state.password} type="password" name="password" />
                    <input onChange={this.changeInput} value={this.state.password2} type="password" name="password2" />
                    <button>Sign Up</button>
                </form>
            </div>

        )
    }
}

export default SignUp;
