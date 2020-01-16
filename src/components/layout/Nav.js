import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogOut from '../Users/LogOut';
import UserLoginIcon from '../Users/UserLoginIcon';

class Nav extends React.Component {
    state = {
        showMobileNav : false,
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
     console.log("NAVBAR IS MOUNTING HERE");
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
                    <Link className="navLink hoverLink" to="/">Home</Link> | <Link className="navLink hoverLink" to="/projects">Projects</Link> | <Link className="navLink hoverLink" to="/mail"><FontAwesomeIcon icon="envelope" /></Link>
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
                    <div className="mobileNavMenu" style={{height:(this.state.showMobileNav ? "240px" : "0px")}}>
                        <div className="mobileNavDiv"><UserLoginIcon loginType={this.props.loginType} /><span>{this.props.username}</span></div>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/" onClick={() => this.closeMobileNav()}>Home</Link></div>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/projects" onClick={() => this.closeMobileNav()}>Projects</Link></div>
                        <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/mail" onClick={() => this.closeMobileNav()}><FontAwesomeIcon icon="envelope" /></Link></div>
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
