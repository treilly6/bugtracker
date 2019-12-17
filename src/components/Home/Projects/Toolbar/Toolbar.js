import React from 'react';
import AddFolder from '../Folders/AddFolder';
import AddTicket from '../Tickets/AddTicket';
import ManagerHandler from '../../../Users/Manager/ManagerHandler';
import '../../../../App.css';

class Toolbar extends React.Component {
    state = {
        tool : "folders",
    }

    constructor(props){
        super(props);
    }

    selectTool = async (tool) => {
        console.log("SELECT TOOL FUN ON TOOLBAR.js");
        console.log(tool);
        console.log("STATE BEFORE CVHANGE");
        console.log(this.state);
        if(this.state.tool === tool) {
            await this.setState({tool : null});
        } else {
            await this.setState({tool : tool});
        }
        console.log("STATE AFTER CHNAGE");
        console.log(this.state);
    }

    render(){
        console.log("RENDERING THE TOOLBAR");
        console.log(this.state.tool);
        var bottomMargin;
        if(this.state.tool === "tickets") {
            bottomMargin = "240px";
        } else if (this.state.tool === null) {
            bottomMargin = "0px";
        } else {
            bottomMargin = "70px";
        }
        return(
            <div style={{display : "flex", position : "relative", marginBottom : bottomMargin, justifyContent : "flex-start"}}>
                <ManagerHandler projectItem={this.props.projectItem} manager={this.props.manager} tool={this.state.tool} selectTool={this.selectTool.bind(this)} setMessage={this.props.setMessage}/>
                <AddFolder addFolder = {this.props.addFolder} tool={this.state.tool} selectTool={this.selectTool.bind(this)} setMessage={this.props.setMessage} />
                <AddTicket addTicket = {this.props.addTicket} tool={this.state.tool} selectTool={this.selectTool.bind(this)} setMessage={this.props.setMessage}/>
            </div>
        )
    }
}

export default Toolbar;
