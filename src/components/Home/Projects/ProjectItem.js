import React from 'react';
import PropTypes from 'prop-types';
import '../../../App.css';
import AddTicket from './Tickets/AddTicket';
import Tickets from './Tickets/Tickets';
// import TicketItem from './Tickets/TicketItem';
import AddFolder from './Folders/AddFolder';
import Folders from './Folders/Folders';
import ManagerHandler from '../../Users/Manager/ManagerHandler';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class ProjectItem extends React.Component {

    state = {
        message: '',
        folderPath : '',
        dataFetched : false,
        folders : [],
        tickets : [],
        currentItem : {},
        projectItem : {},
        manager : false,
    }

    constructor(props) {
        super(props);
        console.log("ITEM CONSTRUCTOR projectitem.js");
        console.log(this.state);
        console.log(props);

        this.state.folderPath = this.props.match.params.folders;

        const projectId = this.props.match.params.projectID;
        const folderPath = (this.props.match.params.folders === undefined ? undefined : this.props.match.params.folders);
        console.log("HERE THE FOLDER PATH ", folderPath);

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
                        this.setState({folders:project.data.folders, tickets:project.data.tickets, currentItem:project.data.currentItem, projectItem:project.data.project, manager:true, dataFetched:true});
                    } else {
                        console.log("NO MANAGER");
                        this.setState({folders:project.data.folders, tickets:project.data.tickets, currentItem:project.data.currentItem, projectItem:project.data.project, dataFetched:true})
                    }
                }
            }))
            .catch(err => {
                console.log("ERROR ON THE AXIOS SPREAD IN PROJECT ITEMS.JS");
                console.log(err);
            })
        console.log("HUH?")
    }

    // need to add here a method that retrieves the given project record and sets the
    // state to hold all that projects folders and tickets
    componentDidMount() {
        console.log("MOUNTING PROPS OF THE PROJECT ITEM");
        console.log(this.state);
        console.log(this.props); //This stuff has the params needed to perform necessary shit. Gonna have to move to contructor
    }

    addTicket = (ticket) => {
        console.log(ticket);
        console.log(this.state.tickets);
        console.log(this.state);
        // this.setState({tickets : [...this.state.tickets, ticket]});
        axios.post(`/api/tickets/${this.state.projectItem._id}/${this.state.folderPath}`, ticket)
            .then(res => {
                console.log("success post add ticket");
                console.log(res);
                this.setState({tickets : [...this.state.tickets, res.data]});
            })
            .catch(err => {
                console.log("error post add ticket");
                console.log(err);
            });
        console.log("IN THE HOME JS");
    }

    addFolder = async (folder) => {
        console.log("HOME JS FOLDER SHIT");
        console.log(folder);
        await axios.post(`/api/folders/${this.state.projectId}/${this.state.folderPath}`, folder)
            .then(res => {
                console.log("her folder");
                console.log(res);
                if (res.data.error) {
                    console.log("Add a display error function here");
                } else {
                    console.log("GONNA ADD THIS SHIT TO THE STAE");
                    this.setState({folders : [...this.state.folders, res.data]});
                }
            })
            .catch(err => {
                console.log("There an error");
                console.log(err);
            })
        console.log("END OF THE ADD FODLER FUNCTION");
        console.log(this.state);
    }


    componentDidUpdate(prevProps, prevState) {
        console.log("PROJECT ITEM DID UPDATE FUNC");
    }

    render() {
        if(!this.state.dataFetched) {
            console.log("NULL RENDER");
            return null;
        } else if(this.state.message) {
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
                    <h1 style={{textAlign : "center"}}>{ title }</h1>
                    {/* NEED TO ADD MESSAGE BOX HERE MAN */}
                    <div className="toolbar-div">
                        <ManagerHandler projectItem={this.state.projectItem} manager={this.state.manager} />
                        <AddFolder addFolder = {this.addFolder} />
                        <AddTicket addTicket = {this.addTicket} />
                    </div>
                    <Folders folders = {this.state.folders} />
                    <Tickets tickets={this.state.tickets} />
                </div>
            )
        }
    }
}


export default ProjectItem;
