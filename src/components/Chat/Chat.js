import React from 'react';
import '../../App.css';
import './Chat.css';
import ChatWindow from './ChatWindow';
import ChatContacts from './ChatContacts';
import axios from 'axios';

import io from 'socket.io-client';

let socket;

class Chat extends React.Component {
    state = {
        userId : null,
        userFetched : false,
        selectedChat : null,
    }

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

        axios.get('/api/user')
            .then(res => {
                console.log("HERE IS THE RES OF THE COMPONENT DID MOUNT ");
                if(res.data.user) {
                    this.setState({userId : res.data.user._id, userFetched : true});
                }
            })


        // when a chat is selected in the chat contacts I can pass it up to here then down to the Chat window to display the proper chat

        // need to think about how to have sockets going for all new messages not just the ones in the chat window
        // I want it to be that while in one chat window, If you recieve a new message in a different chat then
        // The chat will update it's unread messages count
    }

    selectedChat = (chatObj) => {
        console.log("IN THE SELECTED CHAT OF THE CHAT.js ", chatObj);
        this.setState({selectedChat : chatObj});
    }

    render() {
        console.log("HERE IS THE SELECTED CHAT ON THE CHAT.js RENDER");
        console.log(this.state.selectChat);
        console.log("\n","\n","\n");
        if(this.state.userId) {
            return (
                <div className="itemBorder chatCont">
                    <div className="chatTitle">Chat</div>
                    <div className="chatComponentContainer">
                        <div className = "chatContacts">
                            <ChatContacts socket={socket} getSelectedChat={this.selectedChat} userId={this.state.userId} />
                        </div>
                        <div className = "chatWindow">
                            <ChatWindow socket = {socket} selectedChat={this.state.selectedChat} />
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Chat;
