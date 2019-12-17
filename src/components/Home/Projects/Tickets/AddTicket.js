import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem';
import MessageBox from '../../../../MessageBox';
import '../../../../App.css';

class AddTicket extends React.Component {

    state = {
        title : "",
        description : "",
        submitAttempt : 0,
        message : '',
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submit = async (e) => {
        e.preventDefault();
        var ticket = {
            "title" : this.state.title,
            "description" : this.state.description,
        };
        var message = await this.props.addTicket(ticket);
        this.props.setMessage(message);
        this.setState({
            title : "",
            description : "",
        });
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }


    render() {
        return (
            <div className={"toolbar-header " + (this.props.tool === "tickets" ? "toolbar-selected" : "")}>
                <div style={{textAlign:"center", cursor : "pointer"}} onClick={() => this.props.selectTool("tickets")}>Add Ticket</div>
                <div className="itemBorder itemAbsolute" style = {{display : this.props.tool === "tickets" ? "block" : "none", width : "100%"}}>
                    <form onSubmit={this.submit} style={ticketForm}>
                        <input className="formInput" style={formInput} onChange={this.changeInput} value={this.state.title} type="text" name="title" placeholder="Title" />
                        <textarea className="formInput" style={textAreaStyle} onChange={this.changeInput} value={this.state.description} type="text" name="description" placeholder="Description" />
                        <button className="submitButton" type="submit">Add Ticket</button>
                    </form>
                </div>
            </div>
        );
    }
}

const ticketForm = {
    padding : "10px",
};

const formInput = {

};

const textAreaStyle = {
    minWidth : "100%",
    maxWidth : "100%",
    maxHeight : "400px",
    minHeight : "125px",
    height : "125px",
    display : "block",
};

export default AddTicket;
