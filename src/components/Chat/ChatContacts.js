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
                console.log(res.data.chats);
                this.setState({chats : res.data.chats});

                for (const chat of res.data.chats) {
                    console.log("IN OF LOOP OF THE RES DATA CHATS ", chat._id);
                    this.socket.on(`new chat message ${chat._id}`, newMessage => {
                        console.log("HERE IS THE NEW MESSAGE FOR ON THE CLIENTS SIDE ");
                        console.log(newMessage);

                        this.updateChatStateWithNewMessage(newMessage, chat._id);

                        // find the chat by id and append the new message to the messages
                    })
                }
            })
            .catch(err => console.log(err));


        // listen for new chats the user is added to
        this.socket.on(`new chat ${this.props.userId}`, chatObj => {
            console.log("ON THE RECIEVE END OF THE SOCKET ");
            console.log(chatObj);
            this.setState({chats : [...this.state.chats, chatObj]})


            this.socket.on(`new chat message ${chatObj._id}`, newMessage => {
                console.log("HERE IS THE NEW MESSAGE FOR ON THE CLIENTS SIDE ");
                console.log(newMessage);

                // find the chat by id and append the new message to the messages

                console.log("LOKING FOR THE CORRECT CHAT");
                console.log(this.state.chats);
                console.log(chatObj._id);

                this.updateChatStateWithNewMessage(newMessage, chatObj._id);

            })
        });

        // axios call to get all the chats the user is in


        // start a socket that is listenting for the user's ID to be emmited\
        // Allows the server to emmit to all users who have just been added to a new chat
        // Server will emit the new chat object with the user in it and then the client (this file)
        // will add it to the state of chats

        // might want to put that into the Main chat.js component b/c then i can pass the chats down to both
        // the chat window and the chat contacts
    }

    updateChatStateWithNewMessage = (newMessage, chatObjId) => {
        console.log("UPDATE STATE CHAT MESSAGE NEW THING YOU MADE ", newMessage);

        // get the chat obj from the state array
        const changedChat = this.state.chats.find(chat => chat._id === chatObjId);

        // get the index of it probably combine with above return a tuple somewhere
        const chatIndex = this.state.chats.indexOf(changedChat);

        console.log("HERE ID THE CHAT FOUND ", changedChat, chatIndex);

        // copy the chat
        var copyChat = Object.assign({},changedChat);

        console.log("CHAT BEFORE ", copyChat);
        // add the new message
        copyChat.messages.push(newMessage);
        console.log("CHAT AFETR ", copyChat);

        // copy the state
        var copyState = [...this.state.chats];

        // replace the old chat with the updated chat
        copyState[chatIndex] = copyChat;

        // set the state of chats to the updated chats
        this.setState({chats : copyState});
    }

    addNewChat = (newChatObj) => {
        console.log("IN addNewChat in chatcontacts.js");
        console.log(newChatObj);

        // emit new chat to the server
        this.socket.emit(`new chat`, newChatObj);

    }

    selectChat = (chatObj) => {
        console.log("HERE IS THE CHATObj chatcontacts.js ", chatObj);
        this.props.getSelectedChat(chatObj);
    }

    render(){

        var chatItems;
        console.log("CHATCONTACTS RENDER STATE INFOR ", this.state.chats);
        if(this.state.chats) {
            chatItems = this.state.chats.map(chat => {

                // format the users in the chat
                var chatUsers = chat.users.map( user => {
                    return(
                        <span style={{padding : "0px 6px"}}>{user.username}</span>
                    )
                });


                return (
                    <div style={{borderBottom : "1px solid black"}} onClick={() => this.selectChat(chat)}>
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
