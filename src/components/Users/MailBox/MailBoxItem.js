import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class MailBoxItem extends React.Component {
    state = {
        hover : false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    handleHover = () => {
        console.log("HANDLING THE HOVER HEERE THE STATE");
        console.log(this.state);
        this.setState({hover : !this.state.hover});
    }

    render() {
        var metaDiv;
        const mail = this.props.mail;
        var mailDate = new Date(mail.date);
        var date = (mailDate.getMonth() + 1).toString() + "/" + mailDate.getDate().toString() + "/" + mailDate.getFullYear().toString().substring(2);
        var time = mailDate.getHours().toString() + ":" + (mailDate.getMinutes() < 10 ? "0" + mailDate.getMinutes().toString() : mailDate.getMinutes().toString());

        return (
            <div className="mailItemDiv" style={{height : (this.state.hover ? "75px" : "")}} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
                <div style={{width : "100%", padding : "10px"}}>
                    <Link to={`/mail/${mail._id}`} style={{textDecoration : "none", color : "#000", fontWeight : (mail.read ? "" : "bold")}}>
                        <div style={{display : "flex", justifyContent : "space-between", flexWrap : "wrap"}} onClick={this.handleMailHeight}>
                            <div>{mail.title}</div>
                            <div>
                                <div style={{display : (this.state.hover ? "none" : "block")}}>
                                    <span style={{padding : "0px 3px"}}>{date}</span><span style={{padding : "0px 3px"}}>{time}</span>
                                </div>
                                <div style={{display : (this.state.hover ? "flex" : "none")}}>
                                    <div style={{padding : "0px 5px"}}>Delete</div>
                                    <div style={{padding : "0px 5px"}}>Read/Unread</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default MailBoxItem;
