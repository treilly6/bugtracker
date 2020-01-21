import React from 'react';
import CreateChat from './CreateChat';

class ChatContacts extends React.Component {
    state = {
        chats : null,
    }

    constructor(props){
        super(props);
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

    render(){
        return(
            <div>
                <div>
                    <CreateChat />
                </div>
                <div>
                    HERE THE CHAT CONTACTS
                </div>
            </div>
        )
    }
}

export default ChatContacts;
