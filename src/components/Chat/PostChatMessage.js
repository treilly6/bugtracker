import React from 'react';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostChatMessage extends React.Component {
    state = {
        message : '',
        typing : false,
    }

    constructor(props){
        super(props);

        this.socket = this.props.socket;
    }

    componentDidMount(){}

    changeInput = (e) => {
        this.setState({ [e.target.name] : e.target.value});
        console.log("HERE IS THE SCORLL HEIGHT OF THE BOX" , e.target.scrollHeight);
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;


        console.log("HERE IS THE LENGTH OF THE VALUE ", e.target.value.length)

        if(e.target.value.length === 0) {
            // emit that user is not typing anymore
            console.log("THE LENGTH OF THE INPUT VALUE IS NOW ZERO");

            // if the user was previously typing
            if(this.state.typing) {
                this.setState({typing : false});
                // emit that the user is no longer typing
                this.socket.emit('typing', {chatId : this.props.chatId, username : this.props.username, typing : false})
            }


        } else {
            // if the user was not previously typing
            if(!this.state.typing) {
                this.setState({typing : true});
                // emit that the user is typing
                this.socket.emit('typing', {chatId : this.props.chatId, username : this.props.username, typing : true});
            }

        }
    }

    submit = (e) => {
        e.preventDefault();

        // send to parent component (chatWindow.js)
        this.props.sendMessageToParent({body :this.state.message});
        this.setState({message : ''});

        // reset the height of the text input
        console.log(e.target.querySelector('textarea'));
        e.target.querySelector('textarea').style.height = "50px";

        // emit that the user is no longer typing
        this.socket.emit('typing', {chatId : this.props.chatId, username : this.props.username, typing : false});

        // change the typing state to false
        this.setState({typing : false});
    }

    render(){
        return (
            <div className="chat-post-form-cont">
                <form onSubmit={this.submit} className="chat-post-form">
                    <textarea className="chat-post-input" type="text" placeholder="Type Message ..." name="message" value={this.state.message} onChange={this.changeInput} onFocus={() => this.props.scrollToBottom()} />
                    <button className="chat-post-form-btn" type="submit"><FontAwesomeIcon icon="paper-plane" /></button>
                </form>
            </div>
        )
    }
}

export default PostChatMessage;
