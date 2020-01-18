import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Profile.css';
import '../../../App.css';

export default function AddUsername({ userData, setUserData, attempt, setAttempt, setMessage }) {
    const [showForm, setShowForm] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const changeInput = (e) => {
        setUsernameInput(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        axios.post('/api/user/setName', {"username" : usernameInput})
            .then(res => {
                console.log("HERE THE RES ", res);
                setUsernameInput('');
                if(res.data.success) {
                    console.log("SUCCESSFUL SAVE");
                    const newUserData = Object.assign({}, userData);
                    newUserData.username = res.data.savedUsername;
                    setUserData(newUserData);
                    setMessage(res.data.message);
                    setAttempt(attempt + 1);
                } else if(res.data.usernameInUse){
                    console.log("THE USERNAME IS IN USE");
                    setMessage(res.data.message);
                    setAttempt(attempt + 1);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div onClick={toggleForm} style={{color: "#0366d6", fontSize : ".75em"}}>(<span className="hoverLink" style={{fontSize : ".75em"}}>Set Username</span>)</div>
            <div className="formStyle" style={{display : (showForm ? "block" : "none")}}>
                <form onSubmit={submit}>
                    <input style={{height : "30px", width : "90%"}} type="text" placeholder="Enter Username" value={usernameInput} onChange={changeInput} />
                    <button style={{height : "30px", width : "10%"}} className="plusButton" type="submit">+</button>
                </form>
            </div>
        </div>
    )
}
