import React from 'react';

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
    }

    submit = (e) => {
        e.preventDefault();
        
        // send to parent component (chatWindow.js)
        this.props.sendMessageToParent({body :this.state.message, author : "Me"});
        this.setState({message : ''});
    }

    render(){
        return (
            <div>
                <form onSubmit={this.submit}>
                    <input type="text" placeholder="Type Message ..." name="message" value={this.state.message} onChange={this.changeInput} />
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}

export default PostChatMessage;
