import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class AuthRoute extends React.Component {

    state = {
        isLoading : true,
        isAuthenticated : false,
        isContributor : true,
        checkContributor : false,
        message : '',
    }

    constructor(props) {
        super(props);

        console.log("IN CONTRUCTOR OF THE AUTH ROUTE");
        console.log(props);
        console.log(props.match.path);

        // If it is a specific project path, set the state checkContributor to true
        if (props.match.path === '/projects/:projectID/:folders*') {
            console.log("ITS A PROJECT ITEM SHOULD CHECK IF CONTRIBUTOR");
            this.state.checkContributor = true;

        }
    }

    componentDidMount() {
        console.log("PROTECTED ROUTE COMPONENET DID MOUNT");
        if(this.state.checkContributor) {
            var projectId = this.props.match.params.projectID;
            // Check the user is authenticated and check the user is a contributor to the project
            axios.all([axios.post('/api/auth'), axios.get(`/api/auth/contributor/${projectId}`)])
                .then(axios.spread((auth, contributor) => {
                    console.log("IN AXIOS BOTH SPREAD THING");
                    console.log(auth);
                    console.log(contributor);
                    if(!auth.data.authenticated) {
                        // Not authenticated must redirect
                        this.setState({isLoading : false, message : auth.data.message});
                    } else if(!contributor.data.contributor) {
                        // Not a contribuor should redirect to the users projects
                        this.setState({isContributor : false, isAuthenticated : true, isLoading : false, message : contributor.data.message});
                    } else {
                        // IS A CONTRIBUTOR and AUTHENTICATED should add data to state
                        this.setState({isAuthenticated : true, isLoading : false, message : "Success"});
                    }
                }))
                .catch(err => {
                    console.log("ERROR ON THE AXIOS SPREAD IN PROTECTED ROUTE.js");
                    console.log(err);
                })
        } else {
            // Check the user is authenticated
            axios.post('/api/auth')
                .then(res => {
                    console.log("ENSUREAUTHEN IN THE CLASS");
                    console.log(res.data);
                    if (res.data.authenticated === true) {
                        this.setState({isLoading : false, isAuthenticated : true, message : res.data.message});
                    } else {
                        this.setState({isLoading : false, isAuthenticated : false, message : res.data.message});
                    }
                })
                .catch(err => console.log("ERROR ON THE PROTECTED ROUTE CLASS ", err));
        }
    }

    render() {
        const Component = this.props.component;
        if (this.state.isLoading) {
            return null;
        } else {
            if(this.state.isAuthenticated && this.state.isContributor) {
                // THE KEY HERE IS HELPING THE PROJECT HANDLER REFRESH EVERY TIME
                return <Route component={this.props.component} key={this.props.match.url} />
            } else {
                const path = (!this.state.isAuthenticated) ? "/login" : "/projects";
                return <Redirect to={{
                    pathname : path,
                    state : {message : this.state.message},
                }}/>
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
