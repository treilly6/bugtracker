import React from 'react';
import PropTypes from 'prop-types';
import FolderItem from './FolderItem.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../../../App.css';

class Folder extends React.Component {

    state = {
        showFolders : true,
    }

    constructor(props) {
        super(props);
        console.log("FOLDER CONTRUCTOR");
    }

    toggleFolders = () => {
        console.log("TOGGLE THE FOLDERS");
        console.log("PRE TOGGLE ", this.state.showFolders);
        this.setState({showFolders : !this.state.showFolders});
    }

    render() {
        var folderItems = this.props.folders.map((folder) => (
            <FolderItem key={folder._id} folder = {folder} />
        ));

        var toggleContent = this.state.showFolders ? "Hide" : "Show";

        if (folderItems.length == 0) {
            folderItems = <p>No Folders in current Path</p>
        };

        return (
            <div>
                <div>
                    <h3 style={{display : "inline-block"}}>Folders</h3>
                    <span className="linkStyle hoverLink" style={{paddingLeft : "10px", fontSize : "15px", cursor:"pointer"}} onClick={this.toggleFolders}>({toggleContent} Folders)</span>
                </div>
                <div style={{display : this.state.showFolders ? "flex":"none", flexWrap : "wrap"}}>{folderItems}</div>
            </div>
        )
    }
}


export default Folder;
