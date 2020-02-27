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

import axios from 'axios';

export default function Nav(props) {

    const [showMobileNav, setShowMobileNav ] = useState(false);
    const [countsFetched, setCountsFetched ] = useState(false);

    // alert values that will be passed into the context
    const [chatCount, setChatCount ] = useState(null);
    const [mailCount, setMailCount ] = useState(null);

    // useEffect(() => {
    //     console.log("NAVBAR IS MOUNTING HERE");
    //
    //     if(props.userAuthenticated) {
    //         console.log("Making network request for some shit ");
    //
    //         // make call to both the message count and the chat count
    //         axios.all([axios.get('/api/chats/unreadChatCount'), axios.get('/api/unreadMessages')])
    //             .then(axios.spread((chats, messages) => {
    //                 console.log("HERE IS THE NAV SPREAD AXIOS CALL FOR CHATS AND MESSAGES");
    //                 console.log(chats);
    //                 console.log(messages);
    //                 setChatCount(chats.data.chatCount);
    //                 setMailCount(messages.data.messageCount);
    //                 console.log("END OF THE SPREAD AXIOS SHIT");
    //             }))
    //             .catch(err => console.log(err));
    //     }
    //
    //     // make api request to find the users unread messages and unread chats
    //     // axios.all([])
    //
    //     // save them to the chatCount and mailCount variables
    //
    //     // pass them into the context providers below
    //
    //     // console.log("HERE IS THE NAV COMPONENT MOUNT HERE IS THE CONTEXT");
    // }, []);


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
