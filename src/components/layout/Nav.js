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

import io from 'socket.io-client';

import axios from 'axios';

let socket;

export default function Nav(props) {

    const [showMobileNav, setShowMobileNav ] = useState(false);
    const [countsFetched, setCountsFetched ] = useState(false);

    const { setChatCount, chatCount, mailCount, setMailCount } = useContext(NavAlertsContext);

    // if no socket then create one listening to the server port
    if(!socket) {
        console.log("CREATING A SOCKET IN THE nav");
        socket = io(':5000');

        socket.on(`alerts chat message ${props.userId}`, (chatId) => {
            console.log("IN THE USER SOCKET CHECK FOR MESSGAE SHIT ");

            // if not on the chat page
            if(window.location.pathname !== "/chat") {
                axios.post('/api/chats/toggleRead', {chatId, unreadStatus : true})
                .then(res => {
                    console.log("In the res");
                    console.log(res);

                    (res.data.success ? console.log("true") : console.log("false"));

                    console.log(res.data.success.change);

                    // if api call was successful and the returned count is an increment of 1
                    if(res.data.success && res.data.success.change === 1) {
                        console.log("incrementing the chatcount...")
                        console.log("HERE THE ORIGINAL CHAT COUTN ", chatCount);
                        // increment the chat count by 1
                        setChatCount(chatCount + 1)
                    }
                })
                .catch(err => console.log(err));
            }

            console.log("END OF THE BULLSHIT");
        })
    }

    // toggle the mobile nav bar
    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav);
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
                <Link className="navLink hoverLink" to="/">Home</Link> | <Link className="navLink hoverLink" to="/projects">Projects</Link> | <Link className="navLink hoverLink rel-link" to="/mail"><FontAwesomeIcon icon="envelope" /><MailAlert /></Link> | <Link className="navLink hoverLink rel-link" to="/chat"><FontAwesomeIcon icon="comments" /><ChatAlert /></Link>
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
                    <div className="mobileNavDiv"><Link className="navLink hoverLink rel-link" to="/mail" onClick={() => closeMobileNav()}><FontAwesomeIcon icon="envelope" /><MailAlert /></Link></div>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink rel-link" to="/chat" onClick={() => closeMobileNav()}><FontAwesomeIcon icon="comments" /><ChatAlert /></Link></div>
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
