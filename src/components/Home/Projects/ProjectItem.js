import React from 'react';
import PropTypes from 'prop-types';
import AddTicket from './Tickets/AddTicket';
import Tickets from './Tickets/Tickets';
// import TicketItem from './Tickets/TicketItem';
import AddFolder from './Folders/AddFolder';
import Folders from './Folders/Folders';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class ProjectItem extends React.Component {

    state = {
        message: '',
        folderPath : '',
        dataFetched : false,
        folders : [],
        tickets : [],
        currentItem : '',
    }

    constructor(props) {
        super(props);
        console.log("ITEM CONSTRUCTOR projectitem.js");
        console.log(props);

        this.state.folderPath = this.props.match.params.folders;
        this.state.projectId = this.props.match.params.projectID;

        const projectId = this.props.match.params.projectID;
        const folderPath = (this.props.match.params.folders === undefined ? undefined : this.props.match.params.folders);
        console.log("HERE THE FOLDER PATH ", folderPath);

        axios.get(`/api/projects/${projectId}/${folderPath}`)
            .then((res) => {
                console.log("SETTING THE STATE");
                console.log(res.data);
                if (res.data.message) {
                    console.log("YUH");
                    this.setState({message:res.data.message, dataFetched:true,});
                } else {
                    console.log("NUH");
                    this.setState({folders:res.data.folders, tickets:res.data.tickets, currentItem:res.data.currentItem, dataFetched:true,});
                }
            })
            .catch(err => console.log(err));


        // this.state.projectItem = this.props.data.currentItem;
        //
        // this.state.folders = this.props.data.folders;
        // this.state.tickets = this.props.data.tickets;
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
        // this.setState({tickets : [...this.state.tickets, ticket]});
        axios.post(`/api/tickets/${this.state.projectId}/${this.state.folderPath}`, ticket)
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
            console.log(this.props);
            console.log("END OF THE PROPS OF PROJECT ITEM");
            const title = this.state.currentItem.title;
            return (
                <div>
                    <h1>Project PAGE for { title }</h1>
                    <AddFolder addFolder = {this.addFolder} />
                    <Folders folders = {this.state.folders} />
                    <AddTicket addTicket = {this.addTicket} />
                    <Tickets tickets={this.state.tickets} />
                </div>
            )
        }
    }
}

export default ProjectItem;
