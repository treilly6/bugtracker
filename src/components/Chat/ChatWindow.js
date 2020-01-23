import React from 'react';
import PostChatMessage from './PostChatMessage';
import axios from 'axios';
import './Chat.css';

class ChatWindow extends React.Component {
    state = {
        chatObj : null,
    }

    constructor(props){
        super(props);
        this.state.chatObj = this.props.selectedChat;
        this.socket = this.props.socket;


    }

    componentDidUpdate(prevProps) {
        console.log("IN UPDATE FUNCTION");
        console.log(this.socket);
        if(prevProps.selectedChat !== this.props.selectedChat) {
            console.log("PROPS DIFF UPDATE");
            this.setState({chatObj : this.props.selectedChat});

            console.log("HERE IS THE SOCKET")
            console.log(this.socket);

            // check if there was a chat obj for the previous selected chat props
            if(prevProps.selectedChat && prevProps.selectedChat._id) {
                // if the chat obj had a socket listener clear that listener
                if(`$chat window ${prevProps.selectedChat._id}` in this.socket._callbacks) {
                    // remove the listener
                    this.socket.off(`chat window ${prevProps.selectedChat._id}`)
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
                })
            }

        }
    }

    componentDidMount(){
        console.log(this.socket);
    }

    getNewMessage = (msg) => {
        console.log("HERE THE NEW MESSAE ", msg);
        console.log("HERE THE OBJ STATE ", this.state.chatObj);

        // make the message object
        const messageObj = { message : msg, chatId : this.state.chatObj._id};

        // post new message to api
        axios.post(`/api/chats/newMessage`, messageObj)
            .then(res => {
                console.log("RES FROM THE NEW MESSAGE POST ", res);
                if(res.data.success) {
                    // maybe have the server return the actual message obj
                    console.log("SUCCESS AND GOUNG TO SEND TO THE SERVER BY EMIT", "\n", "\n", "\n");
                    // emit new chat to the server
                    this.socket.emit(`new chat message`, messageObj);
                }
            })
            .catch(err => {
                console.log("ERROR ON CHAT WINDOW ", err);
            })

    }

    render(){
        if(!this.state.chatObj) {
            return (
                <div>
                    <div>
                        Select a chat
                    </div>
                </div>
            )
        } else {

            var messages = this.state.chatObj.messages.map(message => {
                return (
                    <div className="messageCont">
                        <div className="author">{message.author}</div>
                        <div className="message">{message.body}</div>
                    </div>
                )
            });

            return (
                <div>
                    <div>
                        {messages}
                    </div>
                    <PostChatMessage sendMessageToParent={this.getNewMessage} />
                </div>
            )
        }
    }
}

export default ChatWindow;
