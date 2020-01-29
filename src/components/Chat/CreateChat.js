import React from 'react';
import '../../App.css';
import axios from 'axios';
import SearchUsersChatInput from './SearchUsersChatInput';


class CreateChat extends React.Component {
    state = {
        users : [],
    }

    constructor(props){
        super(props);

        // init the socket variable to the socket passed in props from chat.js
        this.socket = this.props.socket;
    }

    componentDidMount() {

    }

    submit = (e) => {
        // prevent form submit
        e.preventDefault();

        console.log("HERE STATE OF THE USERS ", this.state.users);

        // map new array of the usernames coming from the users state variable (which comes from SearchUsersChatInput.js)
        const recipients = this.state.users.map(userObj => {
            return userObj.key;
        })

        console.log("HERE THE RECIPIENTS ", console.log(recipients));

        // make an API post request to create a new chat
        axios.post('/api/chats/newChat', recipients)
                .then(res => {
                    console.log("HERE THE RES FOR THE NEW CHAT POST ", res);

                    // if the call was a success send the new chat Obj to parent component (ChatContacts.js)
                    if(res.data.success) {
                        this.props.sendChatToParent(res.data.success.chatObj);
                        this.setState({users : []});
                    }
                })
                .catch(err => console.log(err))

    }

    getUserValues = (values) => {
        console.log("HERE IS THE CURRENt STATE " , this.state);
        console.log("HERE THE INCOMING VALUES ", values);

        // set the state of the users for inviting to the chat
        this.setState({users : values});

        console.log("STATE AFTER THE SETSTATE");
        console.log(this.state);
    }

    changeInput = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }

    render(){
        return(
            <div>
                <div style={{fontSize : "1em", fontWeight : "bold", textAlign : "center"}}>Create New Chat</div>
                <form onSubmit={this.submit}>
                    <div className="inputCont" style={{gridTemplateColumns : "85% 15%"}}>
                        <SearchUsersChatInput sendUserValues = {this.getUserValues} users={this.state.users} />
                        <button className="plusButton" style={{margin : "0px"}} type="submit">+</button>
                    </div>
                </form>
            </div>

        )
    }
}

export default CreateChat;
