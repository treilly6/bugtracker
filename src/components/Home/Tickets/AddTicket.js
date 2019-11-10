import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'

class AddTicket extends React.Component {

    state = {
        title : "",
        description : "",
        author : "",
    }

    changeInput = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        console.log("YEET");
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


    render() {
        return (
            <div style={ticketFormDiv}>
                <form onSubmit={this.submit} style={ticketForm}>
                    <input style={formInput} onChange={this.changeInput} value={this.state.title} type="text" name="title" placeholder="Title" />
                    <input style={formInput} onChange={this.changeInput} value={this.state.description} type="text" name="description" placeholder="Description" />
                    <input style={formInput} onChange={this.changeInput} value={this.state.author} type="text" name="author" placeholder="Author" />
                    <button type="submit">Add Ticket</button>
                </form>
            </div>
        );
    }
}

const ticketForm = {
    padding : "10px",
};

const formInput = {
    display : "block",
    padding : "2px",
    margin: "5px",
};

const ticketFormDiv = {
    backgroundColor:"#ccc",
};

export default AddTicket;
