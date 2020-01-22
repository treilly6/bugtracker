import React from 'react';
import CreateChat from './CreateChat';


const testContacts = {
    chats : [
        {
            users : [1,4,6,7],
            messages : [
                {
                body : "Test Message 1",
                author : 1
                },
                {
                body : "Test Message 2",
                author : 4
                },
                {
                body : "Test Message 3",
                author : 6
                },
            ]
        },
        {
            users : [1,4],
            messages : [
                {
                body : "Test Message 1",
                author : 1
                },
                {
                body : "Test Message 2",
                author : 4
                },
                {
                body : "Test Message 3",
                author : 6
                },
            ]
        },
    ]
}

class ChatContacts extends React.Component {
    state = {
        chats : null,
    }

    constructor(props){
        super(props);

        this.socket = this.props.socket;
    }

    componentDidMount(){
        console.log("CHAT CONTACTS HAS MOUNTED");

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

        this.socket.emit('new chat', newChatObj)


        // add the new chat to the state of chats
        // this.setState({ chats : [...this.state.chats, newChatObj]});
    }

    render(){

        const testChats = testContacts.chats.map(chat => {
            return (
                <div style={{borderBottom : "1px solid black"}}>
                    <div>{chat.users}</div>
                </div>
            )
        });


        return(
            <div>
                <div>
                    <CreateChat socket={this.props.socket} sendChatToParent = {this.addNewChat} />
                </div>
                <div>
                    {testChats}
                </div>
            </div>
        )
    }
}

export default ChatContacts;
