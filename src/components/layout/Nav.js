import React, {useState, useContext, useEffect} from 'react';

// nav alerts context
import { NavAlertsContext } from '../../context/NavAlertsContext';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogOut from '../Users/LogOut';
import UserLoginIcon from '../Users/UserLoginIcon';
import ChatAlert from './navAlerts/ChatAlert';
import MailAlert from './navAlerts/MailAlert';
import './navStyle.css';

export default function Nav(props) {

    const [showMobileNav, setShowMobileNav ] = useState(false);
    const [countsFetched, setCountsFetched ] = useState(false);

    // alert values that will be passed into the context
    const [chatCount, setChatCount ] = useState(null);
    const [mailCount, setMailCount ] = useState(null);

    useEffect(() => {
        console.log("NAVBAR IS MOUNTING HERE");

        // make api request to find the users unread messages and unread chats
        // axios.all([])

        // save them to the chatCount and mailCount variables

        // pass them into the context providers below

        // console.log("HERE IS THE NAV COMPONENT MOUNT HERE IS THE CONTEXT");
    }, [])


    const toggleMobileNav = () => {
        setShowMobileNav({showMobileNav : !showMobileNav});
    }

    const closeMobileNav = () => {
        console.log("IN CLOSE MOBILE NAV");
        if(showMobileNav === true) {
            setShowMobileNav({showMobileNav : false});
        }
    }

    var navBar;
    var mobileNavBar;
    console.log("IN THE NAV RENDER HERE THE PROPS");
    console.log(props);


    if(props.userAuthenticated) {
        navBar =
        <div className="navBar">
            <div>
                <Link className="navLink hoverLink" to="/">Home</Link> | <Link className="navLink hoverLink" to="/projects">Projects</Link> | <Link className="navLink hoverLink rel-link" to="/mail"><FontAwesomeIcon icon="envelope" /><NavAlertsContext.Provider value={{ mailCount, setMailCount}}><MailAlert /></NavAlertsContext.Provider></Link> | <Link className="navLink hoverLink rel-link" to="/chat"><FontAwesomeIcon icon="comments" /><NavAlertsContext.Provider value={{ chatCount, setChatCount}}><ChatAlert /></NavAlertsContext.Provider></Link>
            </div>
        </div>;


        mobileNavBar =
        <div className="mobileNavBar">
            <div style={{position : "relative", textAlign : "right", marginRight:"7px"}}>
                <div className={(showMobileNav ? "mobileMenuDown" : "")} onClick={toggleMobileNav} style={{display:"inline-block"}}>
                    <div className="bar1" style={mobileMenuBar}></div>
                    <div className="bar2" style={mobileMenuBar}></div>
                    <div className="bar3" style={mobileMenuBar}></div>
                </div>
                <div className="mobileNavMenu" style={{height:(showMobileNav ? "308px" : "0px")}}>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/profile" onClick={() => closeMobileNav()}><UserLoginIcon loginType={props.loginType} /><span>{props.username}</span></Link></div>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/" onClick={() => closeMobileNav()}>Home</Link></div>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/projects" onClick={() => closeMobileNav()}>Projects</Link></div>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink rel-link" to="/mail" onClick={() => closeMobileNav()}><FontAwesomeIcon icon="envelope" /><NavAlertsContext.Provider value={{ mailCount, setMailCount}}><MailAlert /></NavAlertsContext.Provider></Link></div>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink rel-link" to="/chat" onClick={() => closeMobileNav()}><FontAwesomeIcon icon="comments" /><NavAlertsContext.Provider value={{ chatCount, setChatCount}}><ChatAlert /></NavAlertsContext.Provider></Link></div>
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


const mobileMenuBar = {
    width:"35px",
    height : "5px",
    backgroundColor : "#fff",
    margin : "6px 0px",
    transition : ".2s",
}
