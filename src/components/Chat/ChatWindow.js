import React from 'react';
import PostChatMessage from './PostChatMessage';
import TypingTracker from './TypingTracker';
import axios from 'axios';
import './Chat.css';

import { convertISOtoLocal } from '../../clientTools/dateFormat';

class ChatWindow extends React.Component {
    state = {
        chatObj : null,
        userId : null,
        username : null,
        typingMessageSet : new Set(),
    }

    constructor(props){
        super(props);
        this.state.chatObj = this.props.selectedChat;

        // need to fugure out how to use context or a reducer so I dont have to pass these variables to children
        this.socket = this.props.socket;
        this.state.userId = this.props.userId;
        this.state.username = this.props.username;

        // create scroll ref so when new message comes in can scroll to bottom
        this.endScrollRef = React.createRef();
        this.typingDivRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        console.log("IN UPDATE FUNCTION for CHAT WINDOW");
        console.log("HERE THE IMPORTANT REF ", this.endScrollRef);

        // jump to the bottom of the scroll (this makes a chat window open at the newest messages)
        if(this.endScrollRef.current) {
            this.jumpToBottom();
        }

        console.log(this.socket);
        if(prevProps.selectedChat !== this.props.selectedChat) {

            // reset the typing tracker dict
            this.typingTrackerDict = {};

            // since a new chat is selected, clear the set
            const resetTypingSet = new Set();

            // set the typing set state
            this.setState({typingMessageSet : resetTypingSet});

            console.log("PROPS DIFF UPDATE");
            this.setState({chatObj : this.props.selectedChat});

            console.log("HERE IS THE SOCKET")
            console.log(this.socket);

            // check if there was a chat obj for the previous selected chat props
            if(prevProps.selectedChat && prevProps.selectedChat._id) {
                // if the chat obj had a socket listener clear that listener
                if(`$chat window ${prevProps.selectedChat._id}` in this.socket._callbacks) {
                    // remove the listeners
                    this.socket.off(`chat window ${prevProps.selectedChat._id}`);
                    this.socket.off(`user typing ${prevProps.selectedChat._id}`);
                }
            }

            console.log("HERE THE SELECTED CHAT", this.props.selectedChat);

            // if there is a selected chat and there is not already a socket listener for the chat item
            if(this.props.selectedChat && !(`$chat window ${this.props.selectedChat._id}` in this.socket._callbacks)) {
                console.log("Adding socket listener");
                console.log(this.socket);

                // create a listener for the chat window
                this.socket.on(`chat window ${this.props.selectedChat._id}`, (newMessage) => {

                    // copy the chatObj
                    const chatCopy = Object.assign({}, this.state.chatObj);

                    // add new message
                    chatCopy.messages = [...chatCopy.messages, newMessage];

                    // set the state
                    this.setState({chatObj : chatCopy});


                    // scroll the messages to the bottom
                    this.scrollToBottom();
                });

                // create a listenr for users typing in the chat window
                this.socket.on(`user typing ${this.props.selectedChat._id}`, (obj) => {

                    // pull username and typing variables out of the object
                    const { username, typing } = obj;

                    console.log("HERE THE CLIENT VALS FOR THE TYPING ", obj);

                    if(typing) {
                        // copy the set from state
                        var setCopy = new Set(this.state.typingMessageSet);

                        // add the username to the set
                        setCopy.add(username);

                        // update the state
                        this.setState({typingMessageSet : setCopy});

                        // scroll the window to the bottom
                        this.scrollToBottom();

                    } else {
                        console.log(`${username} IS NO LONGER TYPING`);

                        // copy the set from state
                        var setCopy = new Set(this.state.typingMessageSet);

                        // delete the username from the set
                        setCopy.delete(username);

                        // set the state to the new set
                        this.setState({typingMessageSet : setCopy})
                    }


                    // add a user is typing a message into the div holding the people typing messages
                });
            }

        }
    }

    componentDidMount(){
        console.log("COMPONENT DID MOUNT OF THE CHAT WINDOW");
        console.log(this.socket);
    }

    // method to scroll to the bottom of the chat
    scrollToBottom = () => {
        console.log("scrolling to the bottom of the window...");
        if(this.endScrollRef.current) {
            this.endScrollRef.current.scrollIntoView({ behavior : 'smooth', block : 'nearest'});
        }
    }

    // method to jump to the bottom of the chat
    jumpToBottom = () => {
        console.log("Jump to the bottom of the window...");
        console.log(this.endScrollRef.current);
        this.endScrollRef.current.scrollIntoView({ behavior : 'auto', block : 'nearest'});
    }

    getNewMessage = (msg) => {
        console.log("HERE THE NEW MESSAE ", msg);
        console.log("HERE THE OBJ STATE ", this.state.chatObj);

        // make the message object
        var messageObj = { message : msg, chatId : this.state.chatObj._id};

        // post new message to api
        axios.post(`/api/chats/newMessage`, messageObj)
            .then(res => {
                console.log("RES FROM THE NEW MESSAGE POST ", res);
                if(res.data.success) {
                    // maybe have the server return the actual message obj
                    console.log("SUCCESS AND GOUNG TO SEND TO THE SERVER BY EMIT ", res.data.success.savedMessage, "\n", "\n", "\n");

                    // overwrite the message key with the saved message from the server
                    messageObj.message = res.data.success.savedMessage;

                    // emit new chat to the server
                    this.socket.emit(`new chat message`, messageObj, this.state.chatObj);
                }
            })
            .catch(err => {
                console.log("ERROR ON CHAT WINDOW ", err);
            })

    }

    render(){
        console.log("CHAT WINDOW RENDER ");
        if(!this.state.chatObj) {
            return (
                <div style={{display : "flex", height : "100%", alignItems : "center", justifyContent : "center"}}>
                    <div>Select a chat</div>
                </div>
            )
        } else {

            const currentTime = new Date();

            console.log("HERE IS THE Chat Obj IN THE CHAT WINDOW ", this.state.chatObj);
            console.log(this.state.chatObj.messages);
            console.log(this.state.chatObj.messages.length);


            // if there are messages in the chatObj map them into proper format

            var messages = this.state.chatObj.messages.map(message => {
                const author = (message.author.userId == this.state.userId ? "Me" : message.author.username)

                var date;


                if(message.date) {
                    // pass the current timestamp and the message timestamp into the function
                    date = convertISOtoLocal(currentTime, message.date);
                }

                return (
                    <div className="full-message-cont">
                        <div className="message-cont">
                            <div className="author">{author}:</div>
                            <div className="message">{message.body}</div>
                        </div>
                        <div className="date-container">
                            <div className="date-text">{date}</div>
                        </div>
                    </div>

                )
            });

            if(messages.length === 0) {
                messages = <div><div style={{padding : "15px 0px", textAlign : "center"}}>No Messages in Chat</div></div>
            }

            return (
                <div className="chat-window-cont">
                    <div className="chat-window-messages">
                        {messages}
                        <TypingTracker users={this.state.typingMessageSet} />
                        <div ref={this.endScrollRef}></div>
                    </div>
                    <PostChatMessage sendMessageToParent={this.getNewMessage} scrollToBottom = {this.scrollToBottom} chatId={this.state.chatObj._id} username={this.state.username} socket = {this.socket} />
                </div>

            )
        }
    }
}

export default ChatWindow;
