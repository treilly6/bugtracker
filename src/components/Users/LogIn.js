import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MessageBox from '../../MessageBox';
import { formContainer, formStyle, inputContainer, buttonStyle, titleStyle, inputStyle } from '../../styles/forms/formStyle';
import '../../App.css';

class LogIn extends React.Component {

    state = {
        "username" : "",
        "password" : "",
        "message" : "",
        "attempt" : 0,
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

    submit = (e) => {
        e.preventDefault();
        axios.post('/api/user/login', {"username": this.state.username, "password" : this.state.password})
            .then((res) => {
                console.log(res.data);
                if(res.data.redirect) {
                    // handle a successful Login
                    console.log("in if redirect");
                    console.log(res.data.redirect);
                    window.location = res.data.redirect;
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

        if(this.state.message) {
            message = <MessageBox key={this.state.attempt} message={this.state.message} />
        }

        return (
            <div style={formContainer}>
                <h2 style={titleStyle}>Log In</h2>
                <div className="messageCont">
                    {message}
                </div>
                <form style={formStyle} onSubmit={this.submit}>
                    <div style={inputContainer}>
                        <label for="username">Username:</label>
                        <input style={inputStyle} value={this.state.username} onChange={this.changeInput} type="text" name="username" />
                    </div>
                    <div style={inputContainer}>
                        <label for="password">Password:</label>
                        <input style={inputStyle} value={this.state.password} onChange={this.changeInput} type="password" name="password" />
                    </div>
                    <div style={{textAlign : "center"}}>
                        <button className="toolbar-button">Log in</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default LogIn;
