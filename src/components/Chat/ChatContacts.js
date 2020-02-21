import React from 'react';
import CreateChat from './CreateChat';
import axios from 'axios';
import './Chat.css';
import tools from './chatSort';



class ChatContacts extends React.Component {
    state = {
        chats : [],
    }

    constructor(props){
        super(props);

        console.log("HERE ALL THE CHAT CONTACTS PROPS");
        console.log(props);

        this.socket = this.props.socket;

        // init variable to keep track of the selected div
        this.selectedDiv = null;
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

        // add new message to the array of messages
        copyChat.messages = [...copyChat.messages, newMessage];

        // copy the chats state
        var copyState = [...this.state.chats];

        // replace the old chat with the updated chat
        copyState[chatIndex] = copyChat;

        console.log("just before the sort chats fuinction here isd the param");
        console.log(copyState);


        // sort the chats from chats with newest messages to chats with oldest messages
        tools.sortChats(copyState)

        // set the state of chats to the updated chats
        this.setState({chats : copyState});

        // run the slected chat again so the chatContacts will re render
        // and correctly highlight the selected Chat in its new order
        this.props.getSelectedChat(this.props.selectedChat);

        console.log("HERE ARE THE STATE OF aLL chats ", this.state.chats);
    }

    addNewChat = (newChatObj) => {
        console.log("IN addNewChat in chatcontacts.js");
        console.log(newChatObj);

        // emit new chat to the server
        this.socket.emit(`new chat`, newChatObj);

    }

    selectChat = (e, chatObj) => {
        console.log("HERE IS THE CHATObj chatcontacts.js ", chatObj);
        this.props.getSelectedChat(chatObj);
        console.log("HERE IS THE E THING MEAJFJ");
        console.log(e.currentTarget);

        // take background color off of previously selected Div if it exists
        if(this.selectedDiv) {
            this.selectedDiv.classList.remove("selected-chat");
        }

        // set background color of the new div
        e.currentTarget.classList.add("selected-chat");
        this.selectedDiv = e.currentTarget;
    }

    render(){

        var chatItems;
        console.log("CHATCONTACTS RENDER STATE INFOR ", this.state.chats);
        if(this.state.chats) {
            chatItems = this.state.chats.map(chat => {

                // find the number of users in the chat
                var chatUserLength = chat.users.length;

                // format the users in the chat
                var chatUsers = chat.users.map((user, index) => {
                    // if the username is the current user
                    // don't add it to the chat display b/c
                    // it is cleaner and it should be implied that the current user
                    // is in their chats
                    if(user.username === this.props.username) {
                        return
                    }

                    // if last item or (second to last item and last item username is current user) format without a comma
                    if(index + 1 === chatUserLength || (index + 2 === chatUserLength && chat.users[index + 1].username === this.props.username)) {
                        return(
                            <span className="contact-user">{user.username}</span>
                        )
                    // if not last item add comma
                    } else {
                        return(
                            <span className="contact-user">{user.username},</span>
                        )
                    }

                });

                console.log("here props chat ", this.props.selectedChat);
                console.log("here map chat ", chat)

                let selected = false;

                if(this.props.selectedChat && chat) {
                    console.log(this.props.selectedChat._id);
                    console.log(chat._id);
                    console.log("EQUALOITY CHECK");
                    console.log(this.props.selectedChat._id === chat._id);
                    if(this.props.selectedChat._id === chat._id) {
                        console.log("SETTING SELECTED TO TRUE for thsi chat");
                        console.log(chat._id);
                        selected = true;
                    }
                }


                // return the clickable div
                return (
                    <div className={"chatContactCont " + (selected ? "selected-chat" : "")}  onClick={(e) => this.selectChat(e, chat)}>
                        <div style={{overflow : "hidden", textOverflow : "ellipsis"}}>{chatUsers}</div>
                    </div>
                )
            });
        }



        return(
            <div>
                <div>
                    <CreateChat socket={this.props.socket} sendChatToParent = {this.addNewChat} />
                </div>
                <div className="chat-items-container">
                    {chatItems}
                </div>
            </div>
        )
    }
}

export default ChatContacts;
