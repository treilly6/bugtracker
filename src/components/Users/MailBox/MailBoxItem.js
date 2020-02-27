import React from 'react';
import PropTypes from 'prop-types';
import MailToolbar from './MailToolbar';
import MobileMailToolbar from './MobileMailToolbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { NavAlertsContext } from '../../../context/NavAlertsContext';
import axios from 'axios';

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
        axios.delete(`/api/mailBox/${mailId}`)
            .then(res => {
                console.log("HERE RES");
                console.log(res);
                if(res.data.deleted == true) {
                    this.setState({mailItem : null});
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // this method's api call needs to be modified so that the context can properly add up or down
    // could just add a variable to the returned object that specifies either 1 or -1
    markMail = (mailId) => {
        console.log("MARKING THE MAIL", mailId);
        console.log("HERE is the context ");
        console.log(this.context);
        var updatedMail = Object.assign({}, this.state.mailItem);
        updatedMail.read = !updatedMail.read;
        this.setState({mailItem : updatedMail});
        axios.put(`/api/mailBox/${mailId}`)
            .then(res => {
                console.log("HERE IS THE RESULT");
                console.log(res);
                var mailCopy = Object.assign({}, this.state.mailItem);
                mailCopy.read = res.data.read;
                this.setState({mailItem : mailCopy});

                // update the context
                this.context.setMailCount(this.context.mailCount - 1);
            })
            .catch(err => {
                console.log(err);
            });
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
                <div className="mailItemDiv" style={{height : (this.state.hover ? "75px" : "")}} onMouseEnter={() => this.handleHover("enter")} onMouseLeave={() => this.handleHover("leave")}>
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
                                        <MailToolbar mailId={mail._id} mailRead={mail.read} deleteMail={this.deleteMail.bind(this)} markMail={this.markMail.bind(this)}/>
                                    </div>
                                    <div>
                                        <MobileMailToolbar mailId={mail._id} mailRead={mail.read} deleteMail={this.deleteMail.bind(this)} markMail={this.markMail.bind(this)} />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )
        }

    }
}

// set the context
MailBoxItem.contextType = NavAlertsContext;
console.log(NavAlertsContext);
console.log("SUPER IMPORTANT MAN");


export default MailBoxItem;
