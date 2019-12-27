import React from 'react';
import stockPhoto from '../../images/collaboration.png';
import projectImg1 from '../../images/projectImg.jpg';
import projectImg2 from '../../images/projectImg2.jpg';
import projectImg3 from '../../images/projectImg3.jpg';
import '../../App.css';

function LandingPage() {
    return (
        <div>
            <div style={imgCont}>
                <img src={stockPhoto} alt="lp-Photo" className="mainPhoto" />
                <h1 style={imgText}>Centralized Project Management</h1>
            </div>
            <div className="flexWrapCont" style={{justifyContent:"center", margin:"10px 0px"}}>
                <div className="homeCard">
                    <div className="homeItem itemBorder" style={{height:"100%"}}>
                        <div style={itemHeader}><div className="homeCardText">Projects</div></div>
                        <div style={itemContent}>
                            <div>
                                <img src={projectImg1} alt="lp-photo1" style={{width : "100%"}} />
                            </div>
                            <div style={{fontSize : "1.2em"}}>
                                Create projects to gain access to features such as tracking errors, discussing solutions, and settting goals
                            </div>
                        </div>
                    </div>
                </div>
                <div className="homeCard">
                    <div className="homeItem itemBorder" style={{height:"100%"}}>
                        <div style={itemHeader}><div className="homeCardText">Manage Teams</div></div>
                        <div style={itemContent}>
                            <div>
                                <img src={projectImg3} alt="lp-photo3" style={{width : "100%"}} />
                            </div>
                            <div style={{fontSize : "1.2em"}}>
                                Assign users to a project management team to easily supervise and approve solutions and goal completions
                            </div>
                        </div>
                    </div>
                </div>
                <div className="homeCard">
                    <div className="homeItem itemBorder" style={{height:"100%"}}>
                        <div style={itemHeader}><div className="homeCardText">Collaborators</div></div>
                        <div style={itemContent}>
                            <div>
                                <img src={projectImg2} alt="lp-photo2" style={{width : "100%"}} />
                            </div>
                            <div style={{fontSize : "1.2em"}}>
                                Invite users to collaborate on your projects or accept invitations to other projects
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
    overflowX : "hidden",
}

const imgText = {
    position : "absolute",
    textAlign:"center",
    fontSize : "1.75em",
}

const itemHeader = {
    height : "80px",
    backgroundColor : "#333",
    color:"#fff",
    borderRadius: "5px 5px 0px 0px",
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
}

const itemContent = {
    padding : "15px",
    display:"flex",
    flexDirection : "column",
    justifyContent : "space-around",
    height : "calc(100% - 80px)",
}

export default LandingPage;
