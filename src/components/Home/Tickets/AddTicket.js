import React from 'react';
import PropTypes from 'prop-types';
import TicketItem from './TicketItem'

class AddTicket extends React.Component {

    state = {}


    render() {
        return (
            <div>
                <form>
                    <input type="text" />
                    <button type="submit">Add Ticket</button>
                </form>
            </div>
        );
    }
}

export default AddTicket;
