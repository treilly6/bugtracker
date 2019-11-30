import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MessageBox from '../../MessageBox';

class LogIn extends React.Component {

    state = {
        "username" : "",
        "password" : "",
    }

    renderSomeJSX() {
        return (
            <div>TESTING THE RENDER FUNCTION OF A ERROR MESSAGE</div>
        )
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
                    localStorage.setItem('authenticated', true);
                    sessionStorage.setItem('authenticated',true);
                    window.location = res.data.redirect;
                } else {
                    // handle an unseccessful login
                    console.log("not a valid login");
                    console.log(res.data.error)
                }
            })
            .catch(err => console.log(err));
    }

    render() {

        // var message = setMessageBox();
        var message;
        if (this.props.location.state && this.props.location.state.error) {
            message = <MessageBox message={this.props.location.state.error} />
        }


        return (
            <div>
                <h2>Log In</h2>
                {message}
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
