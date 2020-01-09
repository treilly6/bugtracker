import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../App.css';

class MobileMailToolbar extends React.Component {
    state = {
        showMenu : false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    handleClick = (e) => {
        console.log("IN THE HANDLE CLICK");
        console.log("STOPPED PROPOGATION");
        this.setState({showMenu : !this.state.showMenu});
    }

    handleDelete = () => {
        console.log("DELETING THSI SHIT");
        this.props.deleteMail(this.props.mailId);
    }

    handleMark = () => {
        console.log("HANDLE MARK");
        this.props.markMail(this.props.mailId);
        this.setState({showMenu : false});
    }


    render() {

        var divStyle = {}
        if(this.state.showMenu){
            divStyle.width = "100%";
            divStyle.padding = "0px 10px";
            divStyle.marginRight = "0px";
        } else {
            divStyle.width = "0%";
            divStyle.padding = "0px";
            divStyle.marginRight = "20px";
        }

        var readStatus = (this.props.mailRead ? <span>Mark Unread</span> : <span>Mark Read</span>);

        return (
            <div className="mobileMailToolbar">
                <div className="mailToolCont" style={{width : (this.state.showMenu ? "100%" : "0%"), padding : (this.state.showMenu ? "0px 10px" : "0px"), marginRight : (this.state.showMenu ? "0px" : "30px")}}>
                    <div style={{color : "#ff0000"}} onClick={this.handleDelete}>Delete</div>
                    <div style={{color : "#4d79ff"}} onClick={this.handleMark}>{readStatus}</div>
                </div>
                <div onClick={this.handleClick} style={{zIndex : "1"}}>
                    <div style = {{transform : "rotate(90deg)", display : (this.state.showMenu ? "none" : "block")}}>...</div>
                    <div style={{display : (this.state.showMenu ? "block" : "none"), fontFamily : "sans-serif", fontSize : ".85em"}}>X</div>
                </div>
            </div>
        )
    }

}

export default MobileMailToolbar;
