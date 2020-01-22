import React from 'react';
import '../../App.css';
import './Chat.css';
import ChatWindow from './ChatWindow';
import ChatContacts from './ChatContacts';

import io from 'socket.io-client';

let socket;

class Chat extends React.Component {
    state = {}

    constructor(props){
        super(props);

        // if no socket then create one listening to the server port
        if(!socket) {
            console.log("CREATING A SOCKET IN THE create chat CONSTRUCTOR");
            socket = io(':5000');
        }
    }

    componentDidMount() {
        console.log("CHAT MOUNTED");



        // when a chat is selected in the chat contacts I can pass it up to here then down to the Chat window to display the proper chat

        // need to think about how to have sockets going for all new messages not just the ones in the chat window
        // I want it to be that while in one chat window, If you recieve a new message in a different chat then
        // The chat will update it's unread messages count
    }

    render() {
        return (
            <div className="itemBorder chatCont">
                <div className="chatTitle">Chat</div>
                <div className="chatComponentContainer">
                    <div className = "chatContacts">
                        <ChatContacts socket = {socket}  />
                    </div>
                    <div className = "chatWindow">
                        <ChatWindow socket = {socket} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;
