import React from 'react';
import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PostChatMessage extends React.Component {
    state = {
        message : '',
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){}

    changeInput = (e) => {
        this.setState({ [e.target.name] : e.target.value});
        console.log("HERE IS THE SCORLL HEIGHT OF THE BOX" , e.target.scrollHeight);
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    submit = (e) => {
        e.preventDefault();

        // send to parent component (chatWindow.js)
        this.props.sendMessageToParent({body :this.state.message});
        this.setState({message : ''});

        // reset the height of the text input
        console.log("IN THE SUBMIT HERE IS THE SHIT", e.target);
        console.log(e.target.querySelector('textarea'));
        e.target.querySelector('textarea').style.height = "50px";
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
