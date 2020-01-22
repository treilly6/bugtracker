import React from 'react';
import '../../App.css';
import axios from 'axios';



class CreateChat extends React.Component {
    state = {
        recipients : '',
        userId : null,
    }

    constructor(props){
        super(props);

        // init the socket variable to the socket passed in props from chat.js
        this.socket = this.props.socket;
    }

    componentDidMount(){
        axios.get('/api/user')
            .then(res => {
                console.log("HERE IS THE RES OF THE COMPONENT DID MOUNT ");
                if(res.data.user) {
                    this.setState({userId : res.data.user._id});

                    console.log("CREATING A SOCKET LISTENER");
                    this.socket.on(`new chat ${this.state.userId}`, (newChat) => {
                        console.log("IN THE NEW CHAT RESPONSE HERE");
                        console.log("HERE IS THE NEW CHAT YOU ARE IN");
                        console.log(newChat);
                    });
                }
            })
    }

    submit = (e) => {
        e.preventDefault();
        const recipients = this.state.recipients.split(",").map(name => name.trim());
        console.log("HERE ARE THE RECIPIENTS ON THE SEND ", recipients);

        axios.post('/api/chats/newChat', recipients)
                .then(res => {
                    console.log("HERE THE RES FOR THE NEW CHAT POST ", res);


                    if(res.data) {
                        this.props.sendChatToParent(res.data);
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
