import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const { ensureAuthenticated } = require('./auth');

export const ProtectedRoute = ({component : Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                console.log("Here the props");
                console.log(props);
                console.log({...rest});
                if(ensureAuthenticated()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname : '/login',
                        }
                    }/>
                }
            }}
        />
    );
};
