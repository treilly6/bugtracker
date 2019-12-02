import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MessageBox from '../../MessageBox';

class LogIn extends React.Component {

    state = {
        "username" : "",
        "password" : "",
        "message" : "",
        "attempt" : 0,
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
        if (this.props.location.state && this.props.location.state.message) {
            message = <MessageBox key={this.state.attempt} message={this.props.location.state.message} />
        } else if(this.state.message) {
            message = <MessageBox key={this.state.attempt} message={this.state.message} />
        }

        return (
            <div style={formContainer}>
                <h2 style={titleStyle}>Log In</h2>
                {message}
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
                        <button style={buttonStyle}>Log in</button>
                    </div>
                </form>
            </div>

        )
    }
}

const formContainer = {
    width: "75%",
    backgroundColor: "#f2f2f2",
    margin: "15px auto",
    paddingBottom: "15px",
    borderRadius: "5px",
}

const formStyle = {
    padding : "10px",
}

const inputStyle = {
    width : "100%",
    display : "block",
    padding: "10px",
    boxSizing : "border-box",
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#495057",
    backgroundColor: "#fff",
    backgroundClip: "padding-box",
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    transition:" border-color .15s ease-in-out,box-shadow .15s ease-in-out",
}

const titleStyle = {
    textAlign : "center",
    backgroundColor : "#333",
    color : "#fff",
    borderRadius: "5px 5px 0px 0px",
    padding : "10px 0px",
}

const inputContainer = {
    padding : "10px 0px",
}

const buttonStyle = {
    backgroundColor : "#3366ff",
    padding : "5px",
    borderRadius : "5px",
    border: "none",
}

export default LogIn;
