import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MailToolbar extends React.Component {
    state = {}

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <div style={{display : "flex", justifyContent : "space-around", width : "90px"}}>
                <div><FontAwesomeIcon icon="trash-alt" /></div>
                <div><FontAwesomeIcon icon="envelope" /></div>
            </div>
        )
    }

}

export default MailToolbar;
