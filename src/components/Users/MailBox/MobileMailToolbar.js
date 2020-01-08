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


    render() {

        return (
            <div className="mobileMailToolbar" onClick={this.handleClick}>
                <div style = {{transform : "rotate(90deg)"}}>...</div>
                <div className="mailToolCont" style={{display : (this.state.showMenu ? "flex" : "none")}}>
                    <div>Delete</div>
                    <div>Mark Read</div>
                </div>
            </div>
        )
    }

}

export default MobileMailToolbar;
