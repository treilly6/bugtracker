import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import MessageBox from '../../MessageBox';
import { formContainer, formStyle, inputContainer, buttonStyle, titleStyle, inputStyle } from '../../styles/forms/formStyle';
import '../../App.css';

class LogIn extends React.Component {

    state = {
        "username" : "",
        "password" : "",
        "message" : "",
        "attempt" : 0,
        redirect : null,
    }

    constructor(props) {
        super(props);
        if (this.props.location.state && this.props.location.state.message) {
            this.state.message = this.props.location.state.message;
        }
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    componentDidMount() {
        console.log("LOGIN JS COMPNENNT MOUNTING HERE");
        console.log(this.props);
    }

    googleLogin = () => {
        console.log("GOOGLE LOGIN");
        window.location = "authLogin/google";
    }

    githubLogin = () => {
        console.log("GITHUB LOGIN");
        window.location = "authLogin/github";
    }

    submit = (e) => {
        e.preventDefault();
        axios.post('/api/user/login', {"username": this.state.username, "password" : this.state.password})
            .then((res) => {
                console.log(res.data);
                if(res.data.redirect) {
                    // handle a successful Login
                    window.location = '/projects';
                    // this.setState({redirect : res.data.redirect, message : res.data.message})
                } else {
                    // handle an unseccessful login
                    console.log("not a valid login");
                    this.setState({message : res.data.message, attempt : this.state.attempt + 1});
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        var message;

        // if(this.state.redirect) {
        //
        //     return (
        //         <Redirect to={{
        //             pathname : this.state.redirect,
        //             state : {message : this.state.message},
        //         }} />
        //     )
        // }

        if(this.state.message) {
            message = <MessageBox key={this.state.attempt} message={this.state.message} />
        }

        return (
            <div style={formContainer}>
                <h2 style={titleStyle}>Log In</h2>
                <div className="messageCont">
                    {message}
                </div>
                <form style={{padding : "10px 10px 0px 10px"}} onSubmit={this.submit}>
                    <div style={inputContainer}>
                        <label for="username">Username:</label>
                        <input style={inputStyle} value={this.state.username} onChange={this.changeInput} type="text" name="username" />
                    </div>
                    <div style={inputContainer}>
                        <label for="password">Password:</label>
                        <input style={inputStyle} value={this.state.password} onChange={this.changeInput} type="password" name="password" />
                    </div>
                    <div style={{textAlign : "center"}}>
                        <button className="toolbar-button" style={{width : "210px", margin : "8px", cursor : "pointer"}}>Log in</button>
                    </div>
                </form>
                <div className="authMethodCont">
                    <div className="authMethod google" onClick={this.googleLogin}>Login with Google</div>
                    <div className="authMethod github" onClick={this.githubLogin}>Login with GitHub</div>
                </div>

            </div>

        )
    }
}

export default LogIn;
