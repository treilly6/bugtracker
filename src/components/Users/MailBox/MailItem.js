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
