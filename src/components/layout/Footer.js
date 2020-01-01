import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

    state = {}

    render() {
        return(
            <footer style = {footerStyle}>
                <div style={footerCont}>
                    <div>Created by Tom Reilly</div>
                </div>
            </footer>
        )
    }
}

const footerStyle = {
    backgroundColor : "#333",
    color : "#fff",
    padding : "0px 15px",
    height : "100px",
}

const footerCont = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
}


export default Footer;
