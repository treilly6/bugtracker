import React from 'react';
import '../../App.css';

class LandingPageTitle extends React.Component {
    state={
        opacity : 0,
    }

    textHandler = async () => {
        console.log("IN THE TEXT HANDLER");
        await setTimeout(() => {
            console.log("IN THE SET TIMEOUT");
            this.setState({opacity : 1});
        }, 250);

        setInterval(() => {
            console.log("IN THE INTERVAL");
            var value = (this.state.opacity === 0 ? 1 : 0);
            this.setState({opacity : value});
        }, 5000)
    }

    componentDidMount() {
        console.log("COMPONENT DID MOUNT");
        this.textHandler();
    }

    render() {
        return(
            <React.Fragment>
                <h1 className="titleText" style={{opacity : this.state.opacity}}>Centralized Project Management</h1>
            </React.Fragment>
        )
    }
}

export default LandingPageTitle;
