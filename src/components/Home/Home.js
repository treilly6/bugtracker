import React from 'react';
import PropTypes from 'prop-types';
import AddTicket from './Tickets/AddTicket';
import Tickets from './Tickets/Tickets';
import TicketItem from './Tickets/TicketItem';

class Home extends React.Component {

    state = {
        tickets : [],
    }

    componentDidMount() {
        fetch('/api/tickets')
            .then(res => res.json())
            .then(tickets => this.setState({tickets : tickets}));
    }


    render() {
        return (
            <div>
                <h1>HOME PAGE</h1>
                <AddTicket />
                <Tickets tickets={this.state.tickets} />
            </div>
        )
    }
}

export default Home;
