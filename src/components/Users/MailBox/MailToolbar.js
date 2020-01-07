import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../App.css';

class MailToolbar extends React.Component {
    state = {
        trashHover : false,
        envelopeHover : false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    handleHover = (divType) => {
        console.log("IN THE HANDLE HOVER HERE IS THE DICE TYPE ", divType);
        if(divType === "trash") {
            this.setState({trashHover : !this.state.trashHover});
        } else if(divType === "envelope") {
            this.setState({envelopeHover : !this.state.envelopeHover});
        }
    }

    render() {

        var trashDiv = (this.state.trashHover ? {backgroundColor : "#f2f2f2", color : "#000"} : {backgroundColor : "#fff", color : "#333"});
        var envelopeDiv = (this.state.envelopeHover ? {backgroundColor : "#f2f2f2", color : "#000"} : {backgroundColor : "#fff", color : "#333"});


        return (
            <div className="mailToolbar" style={{justifyContent : "space-around", width : "90px"}}>
                <div className="iconContainer" style={trashDiv} onMouseEnter={() => this.handleHover("trash")} onMouseLeave={() => this.handleHover("trash")}><FontAwesomeIcon icon="trash-alt" /></div>
                <div className="iconContainer" style={envelopeDiv} onMouseEnter={() => this.handleHover("envelope")} onMouseLeave={() => this.handleHover("envelope")}><FontAwesomeIcon icon="envelope" /></div>
            </div>
        )
    }

}

export default MailToolbar;
