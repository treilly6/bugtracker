import React from 'react';
import '../../App.css';
import axios from 'axios';



class CreateChat extends React.Component {
    state = {
        recipients : '',
    }

    constructor(props){
        super(props);

        // init the socket variable to the socket passed in props from chat.js
        this.socket = this.props.socket;
    }

    componentDidMount() {

    }

    submit = (e) => {
        e.preventDefault();
        const recipients = this.state.recipients.split(",").map(name => name.trim());
        console.log("HERE ARE THE RECIPIENTS ON THE SEND ", recipients);

        axios.post('/api/chats/newChat', recipients)
                .then(res => {
                    console.log("HERE THE RES FOR THE NEW CHAT POST ", res);

                    // if the call was a success send the new chat Obj to parent component (ChatContacts.js)
                    if(res.data.success) {
                        this.props.sendChatToParent(res.data.success.chatObj);
                        this.setState({recipients : ''});
                    }
                })
                .catch(err => console.log(err))

    }

    changeInput = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }
    render(){
        return(
            <div>
                <div>Separate usernames by a comma to add multiple recipients</div>
                <form onSubmit={this.submit}>
                    <div className="inputCont">
                        <input className="formInput" type="text" name="recipients" value={this.state.recipients} onChange={this.changeInput} placeholder="Enter Recipients" />
                        <button className="plusButton" type="submit">+</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default CreateChat;
