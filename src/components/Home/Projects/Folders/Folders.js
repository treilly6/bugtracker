import React from 'react';
import PropTypes from 'prop-types';
import FolderItem from './FolderItem.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import '../../../../App.css';

class Folder extends React.Component {

    state = {
        showFolders : true,
        folders : [],
        dataFetched : false,
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

    componentDidMount(){
        axios.get(`/api/folders/${this.props.projectId}/${this.props.folderPath}`)
            .then(res => {
                console.log("HERER THE RES FROM GET FOLDERS");
                console.log(res);
                this.setState({folders : res.data.folders, dataFetched : true});
            })
            .catch(err => {
                console.log(err);
                console.log("error in the get on folders component");
            })
    }

    componentDidUpdate(prevProps) {
        if(this.props.addedFolderData !== prevProps.addedFolderData) {
            this.setState({folders : [...this.state.folders, this.props.addedFolderData]});
        }
    }

    render() {

        if(!this.state.dataFetched) {
            return(
                <div>...Loading Folders</div>
            )
        } else {
            var folderItems = this.state.folders.map((folder) => (
                <FolderItem key={folder._id} folder = {folder} />
            ));

            var toggleContent = this.state.showFolders ? "Hide" : "Show";

            var noFolders = false;
            if (folderItems.length == 0) {
                noFolders = true;
                folderItems =
                <div style={folderDiv}>
                    <div style={noFolderCont}>
                        <div>No Folders</div>
                    </div>
                </div>;
            };

            return (
                <div style ={{margin : "15px 0px"}}>
                    <div style={{marginBottom : "10px"}}>
                        <h3 style={{display : "inline-block"}}>Folders</h3>
                        <span className="linkStyle hoverLink" style={{paddingLeft : "10px", fontSize : "15px", cursor:"pointer", display : noFolders ? "none" : "initial"}} onClick={this.toggleFolders}>({toggleContent} Folders)</span>
                    </div>
                    <div style={{display : this.state.showFolders ? (noFolders ? "block" : "flex") : "none", flexWrap : "wrap"}}>{folderItems}</div>
                </div>
            )
        }
    }
}

const folderDiv = {
    padding : "20px 5px",
    border : "1px solid #d5d8dd",
    borderRadius : "5px",
    marginBottom : "10px",
    backgroundColor : "#fff",
};

const noFolderCont = {
    justifyContent : "center",
    display : "flex",
}


export default Folder;
