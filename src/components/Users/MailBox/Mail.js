import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Mail extends React.Component {
    state = {}

    constructor(props) {
        super(props);
        console.log("CONTRUCTOR PROPS OF MAILBOX");
        console.log(props);
    }

    componentDidMount() {

    }

    render() {
        var mailItems = this.props.mail.map((mail) => (
            <div style={mailDiv}>
                <h4>{mail.title}</h4>
                <p>{mail.body}</p>
                <h6>{mail.date}</h6>
            </div>
        ));

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
