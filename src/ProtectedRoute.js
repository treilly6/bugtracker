import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
// import session from "express-session";
const { ensureAuthenticated } = require('./auth');


class AuthRoute extends React.Component {

    state = {
        isLoading : true,
        isAuthenticated : false,
    }

    constructor(props) {
        super(props);

        console.log("IN CONTRUCTOR OF THE AUTH ROUTE");
        console.log(this.state);
        console.log(props);

        axios.post('/api/auth')
            .then(res => {
                console.log("ENSUREAUTHEN IN THE CLASS");
                console.log(res.data);
                if (res.data.authenticated === true) {
                    this.setState({isLoading : false, isAuthenticated : true});
                } else {
                    this.setState({isLoading : false, isAuthenticated : false});
                }
            })
            .catch(err => console.log("ERROR ON THE PROTECTED ROUTE CLASS"));

    }

    render() {
        if (this.state.isLoading) {
            return null;
        } else {
            if(this.state.isAuthenticated) {
                return <Route component={this.props.component} />
            } else {
                return <Redirect to={{pathname : "/login"}}/>
            }
        }
    }
}

export default AuthRoute;

export const ProtectedRoute = ({component : Component, ...rest}) => {
    // console.log("BEFORE THE RETURN OF THE PROTESC ROUT STUFF");
    return (
            <Route {...rest} render={
                props => {
                    return <AuthRoute {...props} component={Component} />
                }}
            />);
}
