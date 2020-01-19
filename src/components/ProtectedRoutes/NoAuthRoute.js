import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class NoUserRoute extends React.Component {

    state = {
        isLoading : true,
        isAuthenticated : null,
    }

    constructor(props) {
        super(props);
        console.log("IN CONTRUCTOR OF no AUTH ROUTE");
        console.log(props);
    }

    componentDidMount() {
        console.log("NOOOOOOOOOOOO PROTECT ROUTE COMPONENET DID MOUNT");
        axios.post('/api/auth')
            .then(res => {
                this.setState({isLoading : false, isAuthenticated : res.data.authenticated});
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const Component = this.props.component;
        if (this.state.isLoading) {
            return null;
        } else {
            if(!this.state.isAuthenticated) {
                // THE KEY HERE IS HELPING THE PROJECT HANDLER REFRESH EVERY TIME
                return <Route component={this.props.component} key={this.props.match.url} />
            } else {
                return <Redirect to={{
                    pathname : "/projects",
                    state : {message : "You are already Logged in"},
                }}/>
            }
        }
    }
}

export default NoUserRoute;

export const NoAuthRoute = ({component : Component, ...rest}) => {
    console.log("HERE THE NI AUTH SHIT HERE THE STUFF IDK MAN");
    return (
            <Route {...rest} render={
                props => {
                    return <NoUserRoute {...props} component={Component} />
                }}
            />);
}
