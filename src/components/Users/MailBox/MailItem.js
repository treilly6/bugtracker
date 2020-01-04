import React from 'react';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import axios from 'axios';

class MailItem extends React.Component {
    state = {
        dataFetched : false,
        mailItem : null,
    }

    constructor(props){
        super(props);
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
        }
    }

    render(){
        // var metaDiv;
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
        if(this.state.dataFetched) {
            return(
                <div>
                    <div>{this.state.mailItem.title}</div>
                    <div>{this.state.mailItem.body}</div>
                </div>
            )
        } else {
            return(
                <LoadingCircle content="Mail Item" />
            )
        }
    }
}

export default MailItem;
