import React from 'react';
import axios from "axios";

class TicketStatus extends React.Component {
    state = {
        dataFetched : false,
        manager : false,
    }

    constructor(props) {
        super(props);
        console.log("HERE THE PROPS");
        console.log(props);
        console.log(this.props.ticketItem.project_id);
        axios.get(`/api/auth/manager/${this.props.ticketItem.project_id}/${undefined}`)
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

    componentDidMount(){

    }

    render() {
        if(this.state.dataFetched === false) {
            return null
        } else {
            if(this.props.ticketItem.closed) {
                return(
                    <div>
                        <h6>CLOSED - Approved by {this.props.ticketItem.approved.user} on {this.props.ticketItem.approved.date}</h6>
                    </div>
                )
            } else {
                if(this.props.ticketItem.pending) {
                    if(this.state.manager) {
                        return (
                            <div>
                                <h6>Pending Approval</h6>
                                <button onClick={this.props.approveRequest}>Click here to approve completion</button>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <h6>Pending Approval</h6>
                            </div>
                        )
                    }
                } else {
                    return (
                        <div>
                            <h6>OPEN</h6>
                        </div>
                    )
                }
            }
        }
    }
}

export default TicketStatus;
