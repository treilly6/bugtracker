import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem';
import '../../../../App.css';

class AddTicket extends React.Component {

    state = {
        title : "",
        description : "",
        author : "",
        showForm : false,
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        var ticket = {
            "title" : this.state.title,
            "description" : this.state.description,
            "author" : this.state.author,
        };
        this.props.addTicket(ticket);
        this.setState({
            title : "",
            description : "",
            author : "",
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
                    <form onSubmit={this.submit} style={ticketForm}>
                        <input style={formInput} onChange={this.changeInput} value={this.state.title} type="text" name="title" placeholder="Title" />
                        <input style={formInput} onChange={this.changeInput} value={this.state.description} type="text" name="description" placeholder="Description" />
                        <input style={formInput} onChange={this.changeInput} value={this.state.author} type="text" name="author" placeholder="Author" />
                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

const ticketForm = {
    padding : "10px",
    backgroundColor:"#ccc",
};

const formInput = {
    display : "block",
    padding : "2px",
    margin: "5px",
};

const ticketFormDiv = {

};

export default AddTicket;
