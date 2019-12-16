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
            <div className={"toolbar-header " + (this.props.tool === "contrib" ? "toolbar-selected" : "")}>
                <InviteContributors projectItem={this.props.projectItem} tool={this.props.tool} selectTool={this.props.selectTool} setMessage={this.props.setMessage} />
            </div>
        )
    }
}

export default ManagerTools;
