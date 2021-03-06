import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AddUsername from './AddUsername';
import './Profile.css';
import '../../../App.css';
import MessageBox from '../../../MessageBox';

export default function UserProfile() {
    const [dataFetched, setDataFetched] = useState(false);
    const [userData, setUserData] = useState(null);
    const [attempt, setAttempt] = useState(0);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        axios.get('/api/user')
            .then(res => {
                console.log("HERE IN THE THEN OF THE USE EFFECT");
                console.log(res);
                setUserData(res.data.user);
                setDataFetched(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    if(!dataFetched) {
        console.log("RENDER NO DATA");
        return(
            <div>Loading Profile Info ....</div>
        )
    } else {
        console.log("RENDER DATA");
        var localName = userData.username || "None";
        var addUsername;
        if(localName === "None") {
            addUsername = <AddUsername userData={userData} setUserData={setUserData} attempt={attempt} setAttempt={setAttempt} setMessage={setMessage} />
        }

        var usernameDiv = <div className="localUsernameDiv">{localName} {addUsername}</div>

        var authType;
        if(userData.githubId) {
            authType = <div className="profileCol">Github</div>
        } else if(userData.googleId) {
            authType = <div className="profileCol">Google</div>
        } else {
            authType = <div className="profileCol">None</div>
        }

        return(
            <div className="profileCont">
                <MessageBox key={attempt} message={message} />
                <div className="profileMainCont">
                    <div className="profileHeader">User Profile</div>
                    <div className="profileContent">
                        <div className="ProfileRow">
                            <div className="profileCol">Bugtracker Username :</div>
                            {usernameDiv}
                        </div>
                        <div className="ProfileRow">
                            <div className="profileCol">Third Party Authentication :</div>
                            {authType}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
