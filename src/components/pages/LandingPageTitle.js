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
            }, 1500);

            setTimeout(() => {
                this.setState({opacity2 : 1});
            }, 3000);

            setTimeout(() => {
                this.setState({opacity3 : 1});
            }, 4500);

            setInterval(() => {
                console.log("TIME VAR")
                this.setState({opacity1 : 0, opacity2 : 0, opacity3 : 0});
                setTimeout(() => {
                    this.setState({opacity1 : 1});
                }, 1500);

                setTimeout(() => {
                    this.setState({opacity2 : 1});
                }, 3000);

                setTimeout(() => {
                    this.setState({opacity3 : 1});
                }, 4500);
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
                <h1 style={{opacity : this.state.opacity1, transition : "1s", fontSize : "2em"}}>Centralized</h1>
                <h1 style={{opacity : this.state.opacity2, transition : "1s", fontSize : "2em"}}>Project</h1>
                <h1 style={{opacity : this.state.opacity3, transition : "1s", fontSize : "2em"}}>Management</h1>
            </div>
        )
    }
}

export default LandingPageTitle;
