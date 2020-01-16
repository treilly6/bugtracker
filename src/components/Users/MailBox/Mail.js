import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MailItem from './MailItem';
import MailBoxItem from './MailBoxItem';
import axios from 'axios';
import '../../../App.css';

class Mail extends React.Component {
    state = {}

    constructor(props) {
        super(props);
        console.log("CONTRUCTOR PROPS OF MAIL");
        console.log(props);
    }

    componentDidMount() {

    }

    render() {
        var mailItems;
        console.log("MAIL ITEMS IN MAIL JS ", this.props.mail);

        if (this.props.mail === undefined) {
            mailItems =
            <div style={{margin : "60px 0px"}}>
                <h5 style={{textAlign : "center"}}>Inbox Empty</h5>
            </div>
        } else {
            mailItems = this.props.mail.map((mail) => {
                return(
                    <MailBoxItem mail={mail} />
                )
            });
        }

        return(
            <div>
                {mailItems}
            </div>
        )
    }
}

const mailDiv = {
    border : "1px solid black",
}

export default Mail;
