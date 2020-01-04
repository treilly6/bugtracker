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

// MOVE THIS TO THE MAIL ITEM PAGE /////
    // acceptInvite = (mailObj) => {
    //     console.log("IN THE METHOD HERE THE OBJ");
    //     console.log(mailObj);
    //     var postData = {projectId : mailObj.meta.projectId};
    //     axios.post('/api/user/acceptInvite', postData)
    //         .then(res => {
    //             console.log("ITS LIT");
    //             console.log(res);
    //         })
    //         .catch(err => console.log(err));
    // }
/////////////////// ENDDDDD OF THIS SHIT ///////////////////////////


    render() {
        var mailItems = this.props.mail.map((mail) => {
            return(
                <MailBoxItem mail={mail} />
            )
        });
            // console.log("HERE THE MAIL OBJ");
            // console.log(mail);
            // var metaDiv;
            //
            // var mailDate = new Date(mail.date);
            // var date = (mailDate.getMonth() + 1).toString() + "/" + mailDate.getDate().toString() + "/" + mailDate.getFullYear().toString().substring(2);
            // var time = mailDate.getHours().toString() + ":" + (mailDate.getMinutes() < 10 ? "0" + mailDate.getMinutes().toString() : mailDate.getMinutes().toString());
            //
            //
            // if(mail.meta){
            //     if(mail.meta.messageType === "Invite") {
            //         metaDiv =
            //         <div>
            //             <button style={{backgroundColor: "#2eb82e"}} className="toolbar-button" onClick={() => this.acceptInvite(mail)}>Accept Invitation</button>
            //         </div>;
            //     } else if(mail.meta.messageType === "ticketReq") {
            //         console.log("HERE SOME SHIIIIIIIIT ", mail.meta.path)
            //         metaDiv =
            //         <div>
            //             <Link to={mail.meta.path}><button className="toolbar-button">Go to ticket</button></Link>
            //         </div>;
            //     }
            // } else {
            //     metaDiv = null;
            // }
            // return (
            //     <div className="mailItemDiv">
            //         <Link to={`/mail/${mail._id}`}>
            //             <div style={{display : "flex", justifyContent : "space-between", flexWrap : "wrap"}} onClick={this.handleMailHeight}>
            //                 <div>{mail.title}</div>
            //                 <div><span style={{padding : "0px 3px"}}>{date}</span><span style={{padding : "0px 3px"}}>{time}</span></div>
            //                 <div>
            //                     <div>Delete</div>
            //                     <div>Read/Unread</div>
            //                 </div>
            //             </div>
            //         </Link>
            //     </div>
            // )
        // });

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
