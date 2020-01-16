import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function UserLoginIcon(props) {
    console.log("USER ICON FUNCTIONAL COMPONET");
    const iconDict = {
        "local" : "user",
        "github" : ["fab", "github-square"],
        "google" : ["fab", "google-plus"],
    }
    console.log(props);
    const iconType = iconDict[props.loginType];
    console.log("HERE IS THE ICON DICT VALUIE ", iconType);
    return(
        <React.Fragment><span style={{paddingRight : "7px"}}><FontAwesomeIcon icon={iconType} /></span></React.Fragment>
    )
}

export default UserLoginIcon;
