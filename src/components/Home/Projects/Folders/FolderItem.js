import React from 'react';
import PropTypes from 'prop-types';

class FolderItem extends React.Component {

    state = {}


    render() {
        return (
            <div style={divStyle}>
                <h5>{this.props.folder.title}</h5>
            </div>
        )
    }
}

const divStyle = {
    border : "2px solid black",
    padding : "10px",
    margin : "10px",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
    textAlign : "center",
    width : "100px",
    height : "100px",
}

export default FolderItem;
