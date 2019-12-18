import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Mail from './Mail';

class MailBox extends React.Component {
    state = {
        mailBox : {},
        message : '',
        dataFetched : false,
    }

    constructor(props) {
        super(props);
        console.log("CONTRUCTOR PROPS OF MAILBOX");
        console.log(props);
        axios.get('/api/mailBox')
            .then(res => {
                console.log("THEN OF THE GET API THING");
                console.log(res);
                this.setState({mailBox : res.data.mailbox, message : res.data.message, dataFetched : true})
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {

    }

    render() {
        if(this.state.dataFetched) {
            return(
                <div>
                    <h1 style={{fontSize: "1.5em", margin: "15px 0px", textAlign: "center",}}>Mailbox</h1>
                    <Mail mail={this.state.mailBox.messages}></Mail>
                </div>
            )
        } else {
            return(
                <div>
                    <h4>Loading ...</h4>
                </div>
            )
        }

    }
}

export default MailBox;
