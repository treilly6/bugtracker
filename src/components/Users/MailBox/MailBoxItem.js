import React from 'react';
import PropTypes from 'prop-types';
import MailToolbar from './MailToolbar';
import MobileMailToolbar from './MobileMailToolbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class MailBoxItem extends React.Component {
    state = {
        hover : false,
        mailItem : null,
    }

    constructor(props) {
        super(props);
        this.state.mailItem = this.props.mail;
    }

    componentDidMount() {

    }

    handleHover = (eventType) => {
        console.log("HANDLING THE HOVER HEERE THE STATE");
        console.log(eventType);
        if(window.matchMedia('(min-width: 768px)').matches) {
            console.log(this.state);
            console.log("CHAGING STATE");
            if(eventType === "enter" && this.state.hover === false) {
                this.setState({hover : true});
            } else if(eventType === "leave" && this.state.hover === true) {
                this.setState({hover : false});
            }
        }
    }

    deleteMail = (mailId) => {
        console.log("REMOVING THE MAIL ITEM", mailId);
        this.setState({mailItem : null});
    }

    markMail = (mailId) => {
        console.log("MARKING THE MAIL", mailId);
    }

    render() {
        console.log("MAILBOX ITEM RENDER");
        console.log(this.state);
        if(this.state.mailItem === null) {
            return null;
        } else {
            var metaDiv;
            const mail = this.state.mailItem;
            var mailDate = new Date(mail.date);
            var date = (mailDate.getMonth() + 1).toString() + "/" + mailDate.getDate().toString() + "/" + mailDate.getFullYear().toString().substring(2);
            var time = mailDate.getHours().toString() + ":" + (mailDate.getMinutes() < 10 ? "0" + mailDate.getMinutes().toString() : mailDate.getMinutes().toString());

            return (
                <div className="mailItemDiv" style={{border : (this.state.hover ? "75px" : "")}} onMouseEnter={() => this.handleHover("enter")} onMouseLeave={() => this.handleHover("leave")}>
                    <div style={{width : "100%", padding : "10px"}}>
                            <div style={{display : "flex", justifyContent : "space-between", alignItems : "center"}} onClick={this.handleMailHeight}>
                                <Link to={`/mail/${mail._id}`} style={{textDecoration : "none", width : "100%", color : "#000", fontWeight : (mail.read ? "" : "bold")}}>
                                    <div>{mail.title}</div>
                                </Link>
                                <div className="dateToolCont">
                                    <div style={{display : (this.state.hover ? "none" : "block")}}>
                                        <span style={{padding : "0px 3px"}}>{date}</span><span style={{padding : "0px 3px"}}>{time}</span>
                                    </div>
                                    <div style={{display : (this.state.hover ? "flex" : "none")}}>
                                        <MailToolbar mailId={mail._id} deleteMail={this.deleteMail.bind(this)} markMail={this.markMail.bind(this)}/>
                                    </div>
                                    <div>
                                        <MobileMailToolbar mailId={mail._id} deleteMail={this.deleteMail.bind(this)} markMail={this.markMail.bind(this)} />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )
        }

    }
}

export default MailBoxItem;
