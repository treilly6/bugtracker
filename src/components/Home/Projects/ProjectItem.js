import React from 'react';
import PropTypes from 'prop-types';
import '../../../App.css';

import Tickets from './Tickets/Tickets';
import Folders from './Folders/Folders';
import Tasks from './Tasks/Tasks';
import ManagerHandler from '../../Users/Manager/ManagerHandler';
import Toolbar from './Toolbar/Toolbar';
import MessageBox from '../../../MessageBox';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';
import LoadingCircle from '../../LoadingCircle/LoadingCircle';
import AssignManager from '../../Users/Manager/AssignManager';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class ProjectItem extends React.Component {

    state = {
        folderPath : '',
        dataFetched : false,
        currentItem : {},
        projectItem : {},
        manager : false,
        messageNum : 0,
        message : '',
        addedTaskData : null,
        addedTicketData : null,
        addedFolderDate : null,
    }

    constructor(props) {
        super(props);
        console.log("ITEM CONSTRUCTOR projectitem.js");
        console.log(this.state);
        console.log(props);
        this.state.folderPath = this.props.match.params.folders;
        console.log("HERE THE FOLDER PATH ", this.state.folderPath);
    }

    // need to add here a method that retrieves the given project record and sets the
    // state to hold all that projects folders and tickets
    componentDidMount() {
        console.log("MOUNTING PROPS OF THE PROJECT ITEM");
        console.log(this.state);
        console.log(this.props);
        var projectId = this.props.match.params.projectID;
        var folderPath = (this.props.match.params.folders === undefined ? undefined : this.props.match.params.folders);
        axios.all([axios.get(`/api/projects/${projectId}/${folderPath}`), axios.get(`/api/auth/manager/${projectId}/${folderPath}`)])
            .then(axios.spread((project, manager) => {
                console.log("AXIOS SPREAD RESULT");
                console.log(project);
                console.log(manager);
                if (project.data.message) {
                    console.log("YUH");
                    this.setState({message:project.data.message, dataFetched:true});
                } else {
                    console.log("NUH");
                    if(manager.data.manager) {
                        console.log("IS A MANAGER");
                        this.setState({currentItem:project.data.currentItem, projectItem:project.data.project, manager:true, dataFetched:true});
                    } else {
                        console.log("NO MANAGER");
                        this.setState({currentItem:project.data.currentItem, projectItem:project.data.project, dataFetched:true})
                    }
                }
            }))
            .catch(err => {
                console.log("ERROR ON THE AXIOS SPREAD IN PROJECT ITEMS.JS");
                console.log(err);
            })
    }


    // CAN CONDENSE THIS INTO SINGLE FUNCTION //

    getAddedTask = (addedTask) => {
        console.log("ADDED TASK HERE");
        console.log(addedTask);
        this.setState({addedTaskData : addedTask});
    }

    getAddedTicket = (addedTicket) => {
        console.log("Here the added ticket");
        console.log(addedTicket);
        this.setState({addedTicketData : addedTicket});
    }

    getAddedFolder = (addedFolder) => {
        console.log("Here the added folder");
        console.log(addedFolder);
        this.setState({addedFolderData : addedFolder});
    }

    // END OF THE CONDENSEABLE SHIT //

    setMessage = (message) => {
        console.log("IN THE SET MESSAGE");
        console.log(message);
        this.setState({message : message, messageNum : this.state.messageNum + 1});
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("PROJECT ITEM DID UPDATE FUNC");
    }

    render() {
        if(!this.state.dataFetched) {
            return(
                <div>
                    <LoadingCircle content = "Project Data" />
                </div>
            )
        // Need to actually make this error redirect thing
        } else if(this.state.errorRedirect) {
            return (
                <Redirect to={{
                    pathname : '/projects',
                    state : {message : this.state.message},
                }}/>
            )
        } else {
            console.log("RENDERING THE PROJECT ITEM");
            console.log(this.state);
            console.log("END OF THE STATE PROJECT ITEM");
            const title = this.state.currentItem.title;
            return (
                <div>
                    <BreadCrumb match={this.props.match} projectItem={{title : this.state.projectItem.title, id : this.state.projectItem._id}}/>
                    <MessageBox key={this.state.messageNum} message={this.state.message} />
                    <AssignManager projectId={this.state.projectItem._id} folderPath={this.state.folderPath} manager={this.state.manager} setMessage={this.setMessage.bind(this)} />
                    <div className="toolbar-div">
                        <Toolbar projectItem={this.state.projectItem} folderPath={this.state.folderPath} manager={this.state.manager} getAddedTask={this.getAddedTask.bind(this)} getAddedFolder={this.getAddedFolder.bind(this)} getAddedTicket={this.getAddedTicket.bind(this)} setMessage={this.setMessage.bind(this)} />
                    </div>
                    <Tasks projectId={this.state.projectItem._id}  manager={this.state.manager} folderPath={this.state.folderPath} addedTaskData={this.state.addedTaskData} />
                    <Folders projectId={this.state.projectItem._id}  folderPath={this.state.folderPath} addedFolderData={this.state.addedFolderData}/>
                    <Tickets projectId={this.state.projectItem._id}  manager={this.state.manager} folderPath={this.state.folderPath} addedTicketData={this.state.addedTicketData} />
                </div>
            )
        }
    }
}

export default ProjectItem;
