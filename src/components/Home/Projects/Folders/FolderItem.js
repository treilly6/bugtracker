import React from 'react';
import PropTypes from 'prop-types';
import '../../../../App.css';
import { Link } from 'react-router-dom';

class FolderItem extends React.Component {

    state = {}


    render() {
        var path = window.location.pathname;
        return (
            <div style={divStyle} className="itemBorder">
                <Link className="linkStyle hoverLink" to={`${path}` + `${this.props.folder.title}` + "/"}><h5 style={{color : "#0366d6"}}>{this.props.folder.title}</h5></Link>
            </div>
        )
    }
}

const divStyle = {
    padding : "10px",
    marginRight : "5px",
    marginBottom: "5px",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    textAlign : "center",
    width : "140px",
    height : "140px",
}

export default FolderItem;
