import React from 'react';
import PropTypes from 'prop-types';

class TicketItem extends React.Component {

    state = {};

    render() {
        const title = this.props.match.params.ticketTitle;
        const description = "TESTING THE DESCRIPTOIOISDFJL";
        return (
            <div>
                <div>TICKET DESC PAGE</div>
                <h4>{title}</h4>
                <p>{description}</p>
                <div>
                    <h4>Comments</h4>
                </div>
            </div>
        )
    }
}


export default TicketItem;
