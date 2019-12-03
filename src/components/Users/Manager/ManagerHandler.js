import React from 'react';

class ManagerHandler extends React.Component {
    state = {

    }

    constructor(props) {
        super(props);
        console.log(props);
        this.state.manager = this.props.manager;
    }

    componentDidMount() {}

    render() {
        return(
            <h6>MANAGER TOOLS</h6>
        )
    }
}

export default ManagerHandler;
