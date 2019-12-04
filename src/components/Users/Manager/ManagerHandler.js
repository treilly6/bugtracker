import React from 'react';
import ManagerTools from './ManagerTools';

class ManagerHandler extends React.Component {
    state = {
        manager : null,
    }

    constructor(props) {
        super(props);
        console.log(props);
        this.state.manager = this.props.manager;
    }

    componentDidMount() {}

    render() {
        if(this.state.manager) {
            return (
                <ManagerTools projectItem={this.props.projectItem} />
            )
        } else {
            return null;
        }

    }
}

export default ManagerHandler;
