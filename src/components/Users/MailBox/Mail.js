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
        var mailItems = this.props.mail.map((mail) => {
            return(
                <MailBoxItem mail={mail} />
            )
        });

        if (mailItems.length === 0) {
            mailItems =
            <div>
                <h5>Empty Mailbox</h5>
            </div>
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
