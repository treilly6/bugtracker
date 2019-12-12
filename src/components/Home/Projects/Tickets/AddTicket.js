import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem';
import MessageBox from '../../../../MessageBox';
import '../../../../App.css';

class AddTicket extends React.Component {

    state = {
        title : "",
        description : "",
        showForm : false,
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
            "author" : this.state.author,
        };
        var message = await this.props.addTicket(ticket);
        this.setState({
            title : "",
            description : "",
            message : message,
            submitAttempt : this.state.submitAttempt + 1,
        });
    }

    toggleForm = () => {
        this.setState({showForm : !this.state.showForm});
    }


    render() {
        return (
            <div style={ticketFormDiv}>
                <button className="toolbar-button" onClick={this.toggleForm}>Add Ticket</button>
                <div style = {{display : this.state.showForm ? "block" : "none"}}>
                    <MessageBox key={this.state.submitAttempt} message={this.state.message} />
                    <form onSubmit={this.submit} style={ticketForm}>
                        <input style={formInput} onChange={this.changeInput} value={this.state.title} type="text" name="title" placeholder="Title" />
                        <textarea style={textAreaStyle} onChange={this.changeInput} value={this.state.description} type="text" name="description" placeholder="Description" />
                        <button type="submit">Add Ticket</button>
                    </form>
                </div>
            </div>
        );
    }
}

const ticketForm = {
    padding : "10px",
    backgroundColor: "#f2f2f2",
};

const formInput = {
    display : "block",
    padding : "2px",
    margin: "5px 0px",
};

const textAreaStyle = {
    minWidth : "100%",
    maxWidth : "100%",
    maxHeight : "400px",
    minHeight : "125px",
    height : "125px",
    display : "block",
};

const ticketFormDiv = {

};

export default AddTicket;
