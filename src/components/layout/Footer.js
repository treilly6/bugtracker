import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

    state = {}

    render() {
        return(
            <footer style = {footerStyle}>
                <div>Here is some stuff in the footer</div>
            </footer>
        )
    }
}

const footerStyle = {
    backgroundColor : "#333",
    color : "#fff",
    padding : "0px 15px",
    height : "100px",
    textAlign : "center",
    display : "flex",
    justifyContent : "space-between",
}


export default Footer;
