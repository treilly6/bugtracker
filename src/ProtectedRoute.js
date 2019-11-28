import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
// import session from "express-session";
const { ensureAuthenticated } = require('./auth');


class AuthRoute extends React.Component {

    state = {
        isLoading : true,
        isAuthenticated : false,
        isContributor : true,
    }

    constructor(props) {
        super(props);

        console.log("IN CONTRUCTOR OF THE AUTH ROUTE");
        console.log(this.state);
        console.log(props);

        var checkContributor = false;


        console.log(props.match.path);
        if (props.match.path === '/projects/:projectID/:folders*') {
            console.log("ITS A PROJECT ITEM SHOULD CHECK IF CONTRIBUTOR");
            checkContributor = true;
            var projectId = props.match.params.projectID;
        } else if(props.match.path === '/projects') {
            console.log("ITS THE PROJECT PATH JUST NEED TO MAKE SURE USER IS LOGGED IN");
        }


        if(checkContributor) {
            console.log("IN IF BLOCK BEFOER AXIOS ALL ", projectId);
            axios.all([axios.post('/api/auth'), axios.get(`/api/auth/contributor/${projectId}`)])
                .then(axios.spread((auth, contributor) => {
                    console.log("IN AXIOS BOTH SPREAD THING");
                    console.log(auth);
                    console.log(contributor);
                    if(!auth.data.authenticated) {
                        // Not authenticated must redirect
                        this.setState({isLoading : false});
                    } else if(!contributor.data.contributor) {
                        // Not a contribuor should redirect to the users projects
                        this.setState({isContributor : false, isAuthenticated : true, isLoading : false});
                    } else {
                        // IS A CONTRIBUTOR and AUTHENTICATED should add data to state
                        this.setState({isAuthenticated : true, isLoading : false});
                    }
                    console.log("END");
                }))
                .catch(err => {
                    console.log("ERROR ON THE AXIOS SPREAD IN PROTECTED ROUTE.js");
                    console.log(err);
                })
        } else {
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
    }

    componentDidMount() {
        console.log("PROTECTED ROUTE COMPONENET DID MOUNT");
    }

    render() {
        const Component = this.props.component;
        if (this.state.isLoading) {
            return null;
        } else {
            if(this.state.isAuthenticated) {
                if(this.state.isContributor) {
                    // THE KEY HERE IS HELPING THE PROJECT HANDLER REFRESH EVERY TIME
                    return <Route component={this.props.component} key={this.props.match.url} />
                } else {
                    return <Redirect to={{pathname : "/projects"}}/>
                }
            } else {
                return <Redirect to={{pathname : "/login"}}/>
            }
        }
    }
}

export default AuthRoute;

export const ProtectedRoute = ({component : Component, ...rest}) => {
    console.log("PROTECTED ROUTE CLASS STUFF CHECK THEM PROPS");
    return (
            <Route {...rest} render={
                props => {
                    return <AuthRoute {...props} component={Component} />
                }}
            />);
}
