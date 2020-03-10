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
        username : null,
        userFetched : false,
        selectedChat : null,
    }

    constructor(props){
        super(props);

        console.log("IN THE CHAT CONSTRUCTOR HERE IS THE SOCKET ", socket);

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
                    this.setState({userId : res.data.user._id, username : res.data.user.username, userFetched : true});
                }
            })


        // when a chat is selected in the chat contacts I can pass it up to here then down to the Chat window to display the proper chat

        // need to think about how to have sockets going for all new messages not just the ones in the chat window
        // I want it to be that while in one chat window, If you recieve a new message in a different chat then
        // The chat will update it's unread messages count
    }

    componentWillUnmount(){
        console.log("SUPER MOST IMPORTNSDFSDFGJSGJ  ");
        console.log("\n");
        console.log("\n");
        console.log("\n");
        console.log("\n");
        console.log(socket);
        console.log("CLEAR THE SOCKET SHIT HERE");

        // socket.disconnect();
        //
        // // loop thru the socket and destroy ones not needed
        for (const s of Object.keys(socket._callbacks)) {
            console.log(s);

            if(s.includes('new chat')) {
                console.log("GONNA REMOVE ", s);
                socket.off(s);
            }
        }

        // socket.emit('chat unmount', (socket.id));
        //
        // socket.close();


        console.log("\n");
        console.log("\n");
        console.log("\n");
        console.log("\n");
    }

    selectedChat = (chatObj) => {
        console.log("IN THE SELECTED CHAT OF THE CHAT.js ", chatObj);
        this.setState({selectedChat : chatObj});
    }

    render() {
        console.log("HERE IS THE SELECTED CHAT ON THE CHAT.js RENDER");
        console.log(this.state.selectedChat);
        console.log("\n","\n","\n");
        if(this.state.userId) {
            return (
                <div className="itemBorder chatCont">
                    <div className="chatTitle">Chat</div>
                    <div className="chatComponentContainer">
                        <div className = "chatContacts">
                            <ChatContacts socket={socket} getSelectedChat={this.selectedChat} selectedChat={this.state.selectedChat} userId={this.state.userId} username={this.state.username} />
                        </div>
                        <div className = "chatWindow">
                            <ChatWindow socket = {socket} selectedChat={this.state.selectedChat} userId={this.state.userId} username={this.state.username} />
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
