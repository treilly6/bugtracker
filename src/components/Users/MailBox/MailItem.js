import React from 'react';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../App.css';

class MailItem extends React.Component {
    state = {
        dataFetched : false,
        mailItem : null,
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("MOUNTING THE MAIL ITEM");
        console.log(this.props);
        if(!this.props.mailItem) {
            console.log("AXIOS CALL HERE TO GET THE MAIL ITEM");
            axios.get(`/api/mailBox/${this.props.match.params.mailId}`)
                .then(res => {
                    console.log("HERE THE RESULT");
                    console.log(res);
                    this.setState({dataFetched : true, mailItem : res.data.mailItem});
                })
                .catch(err => {
                    console.log("THERE IS AN ERROR");
                    console.log(err);
                })
        } else {
            this.setState({dataFetched : true});
        }
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

    render(){
        if(this.state.dataFetched) {

            var metaDiv = null;
            var mail = this.state.mailItem
            if(mail.meta){
                if(mail.meta.messageType === "Invite") {
                    metaDiv =
                    <div style={{padding : "10px 0px", textAlign : "center"}}>
                        <button style={{backgroundColor: "#2eb82e"}} className="toolbar-button" onClick={() => this.acceptInvite(mail)}>Accept Invitation</button>
                    </div>;
                } else if(mail.meta.messageType === "ticketReq") {
                    console.log("HERE SOME SHIIIIIIIIT ", mail.meta.path)
                    metaDiv =
                    <div style={{padding : "10px 0px", textAlign : "center"}}>
                        <Link to={mail.meta.path}><button className="toolbar-button">Go to ticket</button></Link>
                    </div>;
                }
            }

            return(
                <div className="itemBorder" style={{margin : "15px auto", maxWidth : "500px"}}>
                    <div style={mailHeader}>{this.state.mailItem.title}</div>
                    <div style={{textAlign : "center", padding : "10px"}}>{this.state.mailItem.body}</div>
                    {metaDiv}
                </div>
            )
        } else {
            return(
                <LoadingCircle content="Mail Item" />
            )
        }
    }
}

const mailHeader = {
    textAlign : "center",
    padding : "15px 0px",
    fontWeight : "bold",
    borderBottom : "1px solid #ccc",
}

export default MailItem;
