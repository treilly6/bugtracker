import React from 'react';
import stockPhoto from '../../images/collaboration.png';
import '../../App.css';

function LandingPage() {
    return (
        <div>
            <div>
                <img src={stockPhoto} alt="lp-Photo" style={{width : "100%"}} />
            </div>
            <div className="flexWrapCont" style={{justifyContent:"center"}}>
                <div className="homeCard">
                    <div className="itemBorder" style={{margin : "5px"}}>
                        <div>Create Projects</div>
                        <div>sdafkjsdfj jfdjasdf sdfjfsd sfda sdfa sdf dsf sdf dsfa sdf sdfa dfs sdf df</div>
                    </div>
                </div>
                <div className="homeCard">
                    <div className="itemBorder" style={{margin : "5px"}}>
                        <div>Assign Management</div>
                        <div>sdafkjsdfj jfdjasdf sdfjfsd sfda sdfa sdf dsf sdf dsfa sdf sdfa dfs sdf df</div>
                    </div>
                </div>
                <div className="homeCard">
                    <div className="itemBorder" style={{margin : "5px"}}>
                        <div>Invite Collaborators</div>
                        <div>sdafkjsdfj jfdjasdf sdfjfsd sfda sdfa sdf dsf sdf dsfa sdf sdfa dfs sdf df</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
