import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { formContainer, formStyle, inputContainer, buttonStyle, titleStyle, inputStyle } from '../../styles/forms/formStyle';

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
                if(res.data.redirect) {
                    window.location.href = res.data.redirect;
                }
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
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return (
            <div style={formContainer}>
                <h2 style={titleStyle}>Sign Up</h2>
                <form style={formStyle} onSubmit={this.submit}>
                    <div style={inputContainer}>
                        <label for="username">Username:</label>
                        <input onChange={this.changeInput} style={inputStyle} value={this.state.username} type="text" name="username" />
                    </div>
                    <div style={inputContainer}>
                        <label for="password">Password:</label>
                        <input onChange={this.changeInput} style={inputStyle} value={this.state.password} type="password" name="password" />
                    </div>
                    <div style={inputContainer}>
                        <label for="password2">Confirm Password:</label>
                        <input onChange={this.changeInput} style={inputStyle} value={this.state.password2} type="password" name="password2" />
                    </div>
                    <div style={{textAlign : "center"}}>
                        <button style={buttonStyle}>Sign Up</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default SignUp;
