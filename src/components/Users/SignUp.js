import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MessageBox from '../../MessageBox';
import { formContainer, formStyle, inputContainer, buttonStyle, titleStyle, inputStyle } from '../../styles/forms/formStyle';
import '../../App.css';

class SignUp extends React.Component {

    state = {
        "username" : "",
        "password" : "",
        "password2" : "",
        "attempt" : 0,
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
                    // successful signup
                    window.location.href = res.data.redirect;
                } else {
                    // unseccessful singup
                    this.setState({message : res.data.message, attempt : this.state.attempt + 1});
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
        var message;
        if (this.props.location.state && this.props.location.state.message) {
            message = <MessageBox key={this.state.attempt} message={this.props.location.state.message} />
        } else if(this.state.message) {
            message = <MessageBox key={this.state.attempt} message={this.state.message} />
        }

        return (
            <div style={formContainer}>
                <h2 style={titleStyle}>Sign Up</h2>
                {message}
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
                        <button className="toolbar-button">Sign Up</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default SignUp;
