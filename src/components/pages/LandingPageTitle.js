import React from 'react';
import '../../App.css';

class LandingPageTitle extends React.Component {
    state={
        opacity1 : 0,
        opacity2 : 0,
        opacity3 : 0,
    }

    textHandler = () => {
        console.log("IN THE TEXT HANDLER");
        setTimeout(() => {
            console.log("IN THE SET TIMEOUT");

            setTimeout(() => {
                this.setState({opacity1 : 1});
            }, 1250);

            setTimeout(() => {
                this.setState({opacity2 : 1});
            }, 2500);

            setTimeout(() => {
                this.setState({opacity3 : 1});
            }, 3750);

            setInterval(() => {
                console.log("TIME VAR")
                this.setState({opacity1 : 0, opacity2 : 0, opacity3 : 0});
                setTimeout(() => {
                    this.setState({opacity1 : 1});
                }, 1250);

                setTimeout(() => {
                    this.setState({opacity2 : 1});
                }, 2500);

                setTimeout(() => {
                    this.setState({opacity3 : 1});
                }, 3750);
            }, 8000);
        }, 250);
    }

    componentDidMount() {
        console.log("COMPONENT DID MOUNT");
        this.textHandler();
    }

    render() {
        return(
            <div className="titleText">
                <h1 style={{...{opacity : this.state.opacity1}, ...wordStyle}}>Centralized</h1>
                <h1 style={{...{opacity : this.state.opacity2}, ...wordStyle}}>Project</h1>
                <h1 style={{...{opacity : this.state.opacity3}, ...wordStyle}}>Management</h1>
            </div>
        )
    }
}

const wordStyle = {
    transition : "1s",
    fontSize : "2em",
    fontFamily : "sans-serif",
}

export default LandingPageTitle;
