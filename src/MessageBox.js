import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class MessageBox extends React.Component {

    state = {
        showingMessage : false,
    }

    constructor(props) {
        super(props);
        console.log("MESSAGE BOX CONSTRUCTOR PROPS");
        console.log(props);
    }

    componentDidMount() {
        console.log("COMPONENET MOUNTEED MESSAGE BOX");
        console.log(this.props);
        this.setState({showingMessage : true});
        console.log("SET THE MESSAGE TO TRUE");

        setTimeout(() => {
            this.setState({showingMessage : false});
        }, 5000);
    }

    render() {
        if(this.state.showingMessage) {
            return(
                <div style={messageBoxCont}>
                    <div>
                        <h5>{this.props.message}</h5>
                    </div>
                </div>
            )
        } else {
            return(
                <div style={{display:"none"}}></div>
            )
        }

    }
}

const messageBoxCont = {
    backgroundColor : "#bfbfbf",
    padding : "10px",
    border : "1px solid #e6e6e6",
    maxWidth : "400px",
    marginLeft : "auto",
    marginRight : "auto",
    textAlign : "center",
}

export default MessageBox;
