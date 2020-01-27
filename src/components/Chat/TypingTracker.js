import React from 'react';
import '../../App.css';
import axios from 'axios';



class TypingTracker extends React.Component {
    state = {

    }

    constructor(props){
        super(props);

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        console.log("TYPE TRACKER UPDATED");
    }

    render(){
        console.log("HERE SI THE TYPING MESSAGE PROPS ");
        console.log(this.props.users);

        var typingBoxes;
        if(this.props.users) {
            const arrUsers = [...this.props.users];
            typingBoxes = arrUsers.map(user => {
                return (
                    <div>{user} is typing...</div>
                )
            });
        }


        return(
            <div>
                {typingBoxes}
            </div>
        )
    }
}

export default TypingTracker;
