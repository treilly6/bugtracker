import React from 'react';
import PostChatMessage from './PostChatMessage';
import axios from 'axios';

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

            // Dup being made b/c on inital click of a chat the props differ from null to an actual chat and make a
            // socket listener for that chat, however, that socket is already made in Chat contacts so there are now 2 socket listeners for
            // the same event. this repeats if you click to a different chat and then come back there will  now be 3 instances of the new message

            console.log("HERE IS THE SOCKET")
            console.log(this.socket);

            console.log("HERE IS THE PREV SELECTED CHAT ID AND THE CURRENT");
            console.log(this.props.selectedChat._id);
            console.log(prevProps.selectedChat);

            if(prevProps.selectedChat && prevProps.selectedChat._id) {
                console.log("THERE IS A PREV ID I SHOULD CHEC THE SOCKET AND REMOVE THE WINDOW CONNECTION IF EXISTS");
                console.log(`$chat window ${prevProps.selectedChat._id}` in this.socket._callbacks);
                if(`$chat window ${prevProps.selectedChat._id}` in this.socket._callbacks) {
                    console.log("THERE EXISTS AN OLD WINDOW LISTENER");
                    console.log(this.socket);
                    this.socket.off(`chat window ${prevProps.selectedChat._id}`)
                    console.log(this.socket);
                }
            }

            console.log("HERE THE SELECTED CHAT", this.props.selectedChat);
            if(this.props.selectedChat && !(`$chat window ${this.props.selectedChat._id}` in this.socket._callbacks)) {
                console.log("Adding socket listener");
                console.log(this.socket);

                // console.log(typeof(this.socket._callbacks), this.socket._callbacks);
                //
                // console.log(`$chat window ${this.props.selectedChat._id}` in this.socket._callbacks);

                this.socket.on(`chat window ${this.props.selectedChat._id}`, (newMessage) => {
                    console.log("HERE IS THE NEW MESSAGE", newMessage);

                    console.log("IN THE SOCKET ON CHAT WINDWO ID HERE THE ID AND SHIT ", this.props.selectedChat._id);
                    console.log(this.props.selectedChat);
                    console.log(this.state.chatObj);

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
                        <div>{message.author}</div>
                        <div>{message.body}</div>
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
