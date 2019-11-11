import React from 'react';
import PropTypes from 'prop-types';
import FolderItem from './FolderItem.js';

class Folder extends React.Component {

    state = {}


    render() {
        var folderItems = this.props.folders.map((folder) => (
            < FolderItem key={folder._id} folder = {folder} />
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
