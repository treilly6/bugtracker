import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LogOut from './LogOut';
import axios from 'axios';

class UserHandler extends React.Component {

    state = {
        authenticated : '',
        user : ''
    }

    constructor(props) {
        super(props);
        console.log("CONTSTRUCTOR OF THE USER HANDLER PAGE");
        console.log(props);
        // axios.post('/api/auth')
        //     .then(res => {
        //         console.log("AXIOS RESULT USER HANDLER");
        //         console.log(res);
        //         if (res.data.authenticated) {
        //             this.setState({authenticated:true, user:res.data.user});
        //         }
        //     })
        //     .catch(err => console.log(err))
    }

    componentDidMount() {
        console.log("MOUNT OF THE USER HANDLER");
    }

    render() {
        // Add some kind of logic here that will change what the output is based on whether the user is loged in or not
        var userBox;
        if(this.props.authenticated == true) {
            userBox =
                <div>
                    <h3>Welcome {this.props.user}</h3>
                    <LogOut></LogOut>
                </div>

        } else {
            userBox =
            <div>
                <Link to="/signup"><div>Sign Up</div></Link>
                <Link to="/login"><div>Log in</div></Link>
            </div>
        }


        return (
            <div>
                {userBox}
            </div>

        )
    }
}

export default UserHandler;
