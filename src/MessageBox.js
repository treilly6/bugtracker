import React from 'react';
import { Route, Redirect } from 'react-router-dom';

class MessageBox extends React.Component {

    // To use the MessageBox componenet in the current configuration you must pass the message
    // to the MessageBox component through a prop called 'message'
    // Also use a key on the component so it remounts each time

    state = {
        showingMessage : false,
        opacity : false,
    }

    constructor(props) {
        super(props);
        console.log("MESSAGE BOX CONSTRUCTOR PROPS");
        console.log(props);
    }

    componentDidMount() {
        console.log("COMPONENET MOUNTEED MESSAGE BOX");
        console.log(this.props);
        this.setState({showingMessage : true, opacity : true});

        setTimeout(() => {
            console.log("OPACITY TIMEOUT");
            this.setState({opacity : false});
        }, 4400);

        setTimeout(() => {
            this.setState({showingMessage : false});
        }, 5000);
    }

    render() {
        if(this.state.showingMessage && this.props.message) {
            var styles = (this.props.message.includes("Error")) ? Object.assign({}, messageBoxCont, errorBox, {opacity : (this.state.opacity ? "1" : "0")}) : Object.assign({}, messageBoxCont, successBox, {opacity : (this.state.opacity ? "1" : "0")});
            return(
                <div style={styles}>
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

var messageBoxCont = {
    padding : "10px",
    margin : "8px 0px",
    maxWidth : "400px",
    textAlign : "center",
    borderRadius : "5px",
    transition : ".5s",
}

const errorBox = {
    backgroundColor : "#ffcccc",
    border : "1px solid #ff3333",
    color : "#ff3333",
}

const successBox = {
    backgroundColor : "#d6f5d6",
    border : "1px solid #33cc33",
    color : "#33cc33",
}

export default MessageBox;
