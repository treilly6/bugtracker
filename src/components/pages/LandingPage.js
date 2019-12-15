import React from 'react';
import stockPhoto from '../../images/collaboration.png';
import '../../App.css';

function LandingPage() {
    return (
        <div>
            <div style={imgCont}>
                <img src={stockPhoto} alt="lp-Photo" style={{width : "100%"}} />
                <h1 style={imgText}>Centralized Project Management</h1>
            </div>
            <div className="flexWrapCont" style={{justifyContent:"center", margin:"10px 0px"}}>
                <div className="homeCard">
                    <div className="homeItem itemBorder">
                        <div style={itemHeader}><div style={{fontSize : "1.5em"}}>Projects</div></div>
                        <div style={itemContent}>
                            <div style={{fontSize : "1.2em"}}>
                                Create projects to gain access to features such as tracking errors, discussing solutions, and settting goals
                            </div>
                        </div>
                    </div>
                </div>
                <div className="homeCard">
                    <div className="homeItem">
                        <div className="itemBorder">
                            <div style={itemHeader}><div style={{fontSize : "1.5em"}}>Management Teams</div></div>
                            <div style={itemContent}>
                                <div style={{fontSize : "1.2em"}}>
                                    Assign users to a project management team to easily supervise and approve solutions and goal completions
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="homeCard">
                    <div className="homeItem">
                        <div className="itemBorder">
                            <div style={itemHeader}><div style={{fontSize : "1.5em"}}>Collaborators</div></div>
                            <div style={itemContent}>
                                <div style={{fontSize : "1.2em"}}>
                                    Invite users to collaborate on your projects or accept invitations to other projects
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const imgCont = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    position:"relative",
}

const imgText = {
    position : "absolute",
    textAlign:"center",
    fontSize : "1.75em",
}

const itemHeader = {
    height : "106px",
    backgroundColor : "#333",
    color:"#fff",
    borderRadius: "5px 5px 0px 0px",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
}

const itemContent = {
    padding : "15px",
    minHeight : "200px",
    display:"flex",
    alignItems:"center",
}

export default LandingPage;
