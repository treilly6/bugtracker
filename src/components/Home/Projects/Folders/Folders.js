import React from 'react';
import PropTypes from 'prop-types';
import FolderItem from './FolderItem.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Folder extends React.Component {

    state = {}


    render() {
        var path = window.location.pathname;
        var folderItems = this.props.folders.map((folder) => (
            <Link to={`${path}` + `${folder.title}`}>< FolderItem key={folder._id} folder = {folder} /></Link>
        ));

        if (folderItems.length == 0) {
            folderItems = <p>No Folders in current Path</p>
        };

        return (
            <div>
                <h3>Folders</h3>
                <div style={folderDiv}>{folderItems}</div>
            </div>
        )
    }
}

const folderDiv = {
    display : "flex",
    flexWrap : "wrap",
}

export default Folder;
