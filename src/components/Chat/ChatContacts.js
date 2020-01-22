import React from 'react';
import CreateChat from './CreateChat';
import axios from 'axios'



class ChatContacts extends React.Component {
    state = {
        chats : [],
    }

    constructor(props){
        super(props);

        this.socket = this.props.socket;
    }

    componentDidMount(){
        console.log("CHAT CONTACTS HAS MOUNTED");
        console.log(this.props.userId);

        // get the chats the user is involved in
        axios.get(`/api/chats`)
            .then(res => {
                console.log("HERE IS THE RES ", res);
                this.setState({chats : res.data.chats});
            })
            .catch(err => console.log(err));


        // listen for new chats the user is added to
        this.socket.on(`new chat ${this.props.userId}`, chatObj => {
            console.log("ON THE RECIEVE END OF THE SOCKET ");
            console.log(chatObj);
            this.setState({chats : [...this.state.chats, chatObj]})
        });

        // axios call to get all the chats the user is in


        // start a socket that is listenting for the user's ID to be emmited\
        // Allows the server to emmit to all users who have just been added to a new chat
        // Server will emit the new chat object with the user in it and then the client (this file)
        // will add it to the state of chats

        // might want to put that into the Main chat.js component b/c then i can pass the chats down to both
        // the chat window and the chat contacts
    }

    addNewChat = (newChatObj) => {
        console.log("IN addNewChat in chatcontacts.js");
        console.log(newChatObj);

        // emit new chat to the server
        this.socket.emit(`new chat`, newChatObj);

    }

    render(){

        var chatItems;
        if(this.state.chats) {
            chatItems = this.state.chats.map(chat => {

                // format the users in the chat
                var chatUsers = chat.users.map( user => {
                    return(
                        <span style={{padding : "0px 6px"}}>{user.username}</span>
                    )
                });


                return (
                    <div style={{borderBottom : "1px solid black"}}>
                        <div>{chatUsers}</div>
                    </div>
                )
            });
        }



        return(
            <div>
                <div>
                    <CreateChat socket={this.props.socket} sendChatToParent = {this.addNewChat} />
                </div>
                <div>
                    {chatItems}
                </div>
            </div>
        )
    }
}

export default ChatContacts;
