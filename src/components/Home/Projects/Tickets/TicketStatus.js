import React from 'react';
import axios from "axios";
import '../../../../App.css';

class TicketStatus extends React.Component {
    state = {
        dataFetched : false,
        manager : false,
    }

    constructor(props) {
        super(props);
        console.log("HERE THE PROPS");
        console.log(props);
    }

    componentDidMount(){
        // check to see if the user is a manager
        axios.get(`/api/auth/manager/${this.props.ticketItem.project_id}/${this.props.folderPath}`)
            .then(res => {
                console.log("MANAGER RES");
                console.log(res);
                if (res.data.manager) {
                    console.log("YES MANAGER");
                    this.setState({manager : true, dataFetched : true});
                } else {
                    console.log("NO MANAGER");
                    this.setState({dataFetched : true});
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        if(this.state.dataFetched === false) {
            return null
        } else {
            if(this.props.ticketItem.closed) {
                // change the time of the message to a local string
                var ticketDate = new Date(this.props.ticketItem.approved.date).toLocaleString();
                return(
                    <div>
                        <h6><span style={closedSpan} className="statusSpan">Closed</span> - Approved by {this.props.ticketItem.approved.user} on {ticketDate}</h6>
                    </div>
                )
            } else {
                if(this.props.ticketItem.pending) {
                    if(this.state.manager) {
                        return (
                            <div>
                                <h6><span style={openSpan} className="statusSpan">Pending Approval</span></h6>
                                <button className="approve-button" onClick={() => this.props.evalRequest({"command":"approve"})}>Approve Completion</button>
                                <button className="reject-button" onClick={() => this.props.evalRequest({"command":"reject"})}>Reject Completion</button>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <h6><span style={openSpan} className="statusSpan">Pending Approval</span></h6>
                            </div>
                        )
                    }
                } else {
                    return (
                        <div>
                            <h6><span style={openSpan} className="statusSpan">Open</span></h6>
                        </div>
                    )
                }
            }
        }
    }
}

const closedSpan = {
    backgroundColor : "#ffcccc",
    border : "1px solid #ff3333",
    color : "#ff3333",
}

const openSpan = {
    backgroundColor : "#d6f5d6",
    border : "1px solid #33cc33",
    color : "#33cc33",
}

export default TicketStatus;
