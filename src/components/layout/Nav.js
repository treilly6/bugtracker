import React from 'react';
import { ChatAlertsContext } from '../../context/ChatAlertsContext';
import { MailAlertsContext } from '../../context/MailAlertsContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogOut from '../Users/LogOut';
import UserLoginIcon from '../Users/UserLoginIcon';
import ChatAlert from './navAlerts/ChatAlert';
import MailAlert from './navAlerts/MailAlert';
import './navStyle.css';

class Nav extends React.Component {
    state = {
        showMobileNav : false,
        countsFetched : false,
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
     console.log("NAVBAR IS MOUNTING HERE");

     // make api request to find the users unread messages and unread chats
     // axios.all([])

     // save them to the context

     // need to figure out how to use the context properly when in a class component
    }

    toggleMobileNav = () => {
        this.setState({showMobileNav : !this.state.showMobileNav});
    }

    closeMobileNav = () => {
        console.log("IN CLOSE MOBILE NAV");
        if(this.state.showMobileNav === true) {
            this.setState({showMobileNav : false});
        }
    }

    render() {
        var navBar;
        var mobileNavBar;
        console.log("IN THE NAV RENDER HERE THE PROPS");
        console.log(this.props);


        if(this.props.userAuthenticated) {
            navBar =
            <div className="navBar">
                <div>
                    <Link className="navLink hoverLink" to="/">Home</Link> | <Link className="navLink hoverLink" to="/projects">Projects</Link> | <Link className="navLink hoverLink rel-link" to="/mail"><FontAwesomeIcon icon="envelope" /><MailAlertsContext.Provider><MailAlert /></MailAlertsContext.Provider></Link> | <Link className="navLink hoverLink rel-link" to="/chat"><FontAwesomeIcon icon="comments" /><ChatAlertsContext.Provider><ChatAlert /></ChatAlertsContext.Provider></Link>
                </div>
            </div>;


            mobileNavBar =
            <div className="mobileNavBar">
                <div style={{position : "relative", textAlign : "right", marginRight:"7px"}}>
                    <div className={(this.state.showMobileNav ? "mobileMenuDown" : "")} onClick={this.toggleMobileNav} style={{display:"inline-block"}}>
                        <div className="bar1" style={mobileMenuBar}></div>
                        <div className="bar2" style={mobileMenuBar}></div>
                        <div className="bar3" style={mobileMenuBar}></div>
                    </div>
                    <div className="mobileNavMenu" style={{height:(this.state.showMobileNav ? "308px" : "0px")}}>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/profile" onClick={() => this.closeMobileNav()}><UserLoginIcon loginType={this.props.loginType} /><span>{this.props.username}</span></Link></div>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/" onClick={() => this.closeMobileNav()}>Home</Link></div>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/projects" onClick={() => this.closeMobileNav()}>Projects</Link></div>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink rel-link" to="/mail" onClick={() => this.closeMobileNav()}><FontAwesomeIcon icon="envelope" /><MailAlertsContext.Provider><MailAlert /></MailAlertsContext.Provider></Link></div>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink rel-link" to="/chat" onClick={() => this.closeMobileNav()}><FontAwesomeIcon icon="comments" /><ChatAlertsContext.Provider><ChatAlert /></ChatAlertsContext.Provider></Link></div>
                        <div className="mobileNavDiv"><LogOut></LogOut></div>
                    </div>
                </div>
            </div>;

        }

        return(
            <div>
                {navBar}
                {mobileNavBar}
            </div>
        )
    }
}


const mobileMenuBar = {
    width:"35px",
    height : "5px",
    backgroundColor : "#fff",
    margin : "6px 0px",
    transition : ".2s",
}

export default Nav;
