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
            <div className="mailItemDiv" onMouseEnter={() => this.handleHover} onMouseLeave={() => this.handleHover}>
                <Link to={`/mail/${mail._id}`}>
                    <div style={{display : "flex", justifyContent : "space-between", flexWrap : "wrap"}} onClick={this.handleMailHeight}>
                        <div>{mail.title}</div>
                        <div>
                            <span style={{padding : "0px 3px", display : (this.state.hover ? "none" : "block"),}}>{date}</span><span style={{padding : "0px 3px"}}>{time}</span>
                            <div style={{display : (this.state.hover ? "block" : "none")}}>
                                <div>Delete</div>
                                <div>Read/Unread</div>
                            </div>
                        </div>

                    </div>
                </Link>
            </div>
        )
    }
}

export default MailBoxItem;
