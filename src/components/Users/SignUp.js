import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import MessageBox from '../../MessageBox';
import { formContainer, formStyle, inputContainer, buttonStyle, titleStyle, inputStyle } from '../../styles/forms/formStyle';
import '../../App.css';

class SignUp extends React.Component {

    state = {
        username : "",
        password : "",
        password2 : "",
        attempt : 0,
        redirect : null,
        message : null,
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
            .then(async (res) => {
                console.log("YEEET");
                console.log(res);
                if(res.data.redirect) {
                    // successful signup
                    this.setState({redirect : res.data.redirect, message : res.data.message});
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

    googleSignup = () => {
        console.log("GOOGLE Signup");
        window.location = "authLogin/google";
    }

    githubSignup = () => {
        console.log("GITHUB Signup");
        window.location = "authLogin/github";
    }

    render() {
        if(this.state.redirect) {
            return(
                <Redirect to={{
                    pathname : this.state.redirect,
                    state : { message : this.state.message }
                }} />
            )
        } else {
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
                    <form style={{padding : "10px 10px 0px 10px"}} onSubmit={this.submit}>
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
                            <button className="toolbar-button" style={{width : "210px", margin : "8px", cursor : "pointer"}}>Sign Up</button>
                        </div>
                    </form>
                    <div className="authMethodCont">
                        <div className="authMethod google" onClick={this.googleSignup}>Sign up with Google</div>
                        <div className="authMethod github" onClick={this.githubSignup}>Sign up with GitHub</div>
                        <div className="authMethod amazon" onClick={this.githubSignup}>Sign up with Amazon</div>
                    </div>
                </div>

            )
        }
    }
}

export default SignUp;
