import React from 'react';
import InviteContributors from './InviteContributors';


class ManagerTools extends React.Component {
    state = {}

    constructor(props){
        super(props);
        console.log("MANAGER TOOLS PROPS");
        console.log(props);
    }

    componentDidMount(){}

    render(){
        console.log("MANAGER TOOLS RENDER");

        return(
            <div>
                <InviteContributors projectItem={this.props.projectItem} />
            </div>
        )
    }
}

export default ManagerTools;
