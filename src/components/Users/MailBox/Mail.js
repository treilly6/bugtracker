import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class Mail extends React.Component {
    state = {}

    constructor(props) {
        super(props);
        console.log("CONTRUCTOR PROPS OF MAIL");
        console.log(props);
    }

    componentDidMount() {

    }

    acceptInvite = (mailObj) => {
        console.log("IN THE METHOD HERE THE OBJ");
        console.log(mailObj);
        var postData = {projectId : mailObj.meta.projectId};
        axios.post('/api/user/acceptInvite', postData)
            .then(res => {
                console.log("ITS LIT");
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    render() {
        var mailItems = this.props.mail.map((mail) => {
            var inviteDiv = (mail.meta && mail.meta.messageType === 'Invite') ?
            <div>
                <button onClick={() => this.acceptInvite(mail)}>Accept Invitation</button>
            </div> : null;
            return (
                <div style={mailDiv}>
                    <h4>{mail.title}</h4>
                    <p>{mail.body}</p>
                    <h6>{mail.date}</h6>
                    {inviteDiv}
                </div>
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
