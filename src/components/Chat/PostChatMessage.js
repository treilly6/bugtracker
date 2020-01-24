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
    }

    render(){
        return (
            <div className="chat-post-form-cont">
                <form onSubmit={this.submit} className="chat-post-form">
                    <textarea className="chat-post-input" type="text" placeholder="Type Message ..." name="message" value={this.state.message} onChange={this.changeInput} />
                    <button className="chat-post-form-btn" type="submit"><FontAwesomeIcon icon="paper-plane" /></button>
                </form>
            </div>
        )
    }
}

export default PostChatMessage;
