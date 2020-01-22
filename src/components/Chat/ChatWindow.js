import React from 'react';
import PostChatMessage from './PostChatMessage';

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
        console.log("IN UPDATE FUNCTION")
        if(prevProps.selectedChat !== this.props.selectedChat) {
            console.log("PROPS DIFF UPDATE");
            this.setState({chatObj : this.props.selectedChat});
        }
    }

    componentDidMount(){}

    getNewMessage = (msg) => {
        console.log("HERE THE NEW MESSAE ", msg);
        console.log("HERE THE OBJ STATE ", this.state.chatObj);

        const msgObj = {
            message : msg,
            chatId : this.state.chatObj._id,
        }

        console.log("HERE IS HE MSG OBJ ", msgObj);

        // emit new chat to the server
        this.socket.emit(`new chat message`, msgObj);

        // var chatObjCopy = Object.assign({}, this.state.chatObj);
        // chatObjCopy.messages = [...chatObjCopy.messages, msg];
        // console.log("AFTER THE PUSH ASSING ", chatObjCopy);
        // this.setState({chatObj : chatObjCopy});
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
