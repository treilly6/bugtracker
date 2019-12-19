import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Nav extends React.Component {
    state = {
        showMobileNav : false,
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    toggleMobileNav = () => {
        this.setState({showMobileNav : !this.state.showMobileNav});
    }

    render() {
        var navBar;
        var mobileNavBar;
        if(this.props.userAuthenticated) {
            navBar =
            <div>
                <Link className="navLink hoverLink" to="/">Home</Link> | <Link className="navLink hoverLink" to="/projects">Projects</Link> | <Link className="navLink hoverLink" to="/mail"><FontAwesomeIcon icon="envelope" /></Link>
            </div>;
            mobileNavBar =
            <div style={{position : "relative", textAlign : "right", marginRight:"5px"}}>

                <div className={(this.state.showMobileNav ? "mobileMenuDown" : "")} onClick={this.toggleMobileNav} style={{display:"inline-block"}}>
                    <div className="bar1" style={mobileMenuBar}></div>
                    <div className="bar2" style={mobileMenuBar}></div>
                    <div className="bar3" style={mobileMenuBar}></div>
                </div>

                <div className="mobileNavMenu" style={{position:"absolute",right:"-5px", top : "98%", display:(this.state.showMobileNav ? "block" : "none")}}>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/">Home</Link></div>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/projects">Projects</Link></div>
                    <div className="mobileNavDiv"><Link className="navLink hoverLink" to="/mail"><FontAwesomeIcon icon="envelope" /></Link></div>
                </div>

            </div>;
        }

        return(
            <div>
                <div className="navBar">
                    {navBar}
                </div>
                <div className="mobileNavBar">
                    {mobileNavBar}
                </div>
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
