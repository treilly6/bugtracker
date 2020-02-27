import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { NoAuthRoute } from './components/ProtectedRoutes/NoAuthRoute';

// user context\
import { UserContext } from './context/UserContext';

// alerts context
import { NavAlertsContext } from './context/NavAlertsContext';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './components/pages/LandingPage';
import Home from './components/Home/Home';
import ProjectHandler from './components/Home/Projects/ProjectHandler';
import LogIn from './components/Users/LogIn';
import SignUp from './components/Users/SignUp';
import MailBox from './components/Users/MailBox/MailBox';
import MailItem from './components/Users/MailBox/MailItem';
import UserProfile from './components/Users/Profile/UserProfile';
import Chat from './components/Chat/Chat';
import NotFoundPage from './components/404/NotFoundPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faUser, faTrashAlt, faEnvelopeOpenText, faComments, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faGooglePlus } from '@fortawesome/free-brands-svg-icons';

// Style
import './App.css';

library.add(faEnvelope);
library.add(faTrashAlt);
library.add(faEnvelopeOpenText);
library.add(faUser);
library.add(faGithubSquare);
library.add(faGooglePlus);
library.add(faComments);
library.add(faPaperPlane);

function App() {
    // user that is passed to the user context
    const [user, setUser] = useState(null);

    // userId whcih is used as a dependency in the useEffect function below
    // I did this becasue if an object is used in the dependency the UseEffect
    // ran in an infinite loop
    const [userId, setUserId] = useState(null);


    // alert values that will be passed into the context
    const [chatCount, setChatCount ] = useState(null);
    const [mailCount, setMailCount ] = useState(null);

    // variable to check if the user data was fetched yet
    // used to prevent render unless data fetched
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        console.log("USE EFFECT IS CALLED")
        console.log("User before the axios call ", user);
        axios.post('/api/auth')
            .then(res => {
                console.log("HERE IS FULL RES ", res);
                console.log("HERE IS THE DATA ", res.data.auth);
                if(res.data.authenticated) {
                    setUser(res.data.user);
                    setUserId(res.data.user._id);
                    // make call to both the message count and the chat count
                    axios.all([axios.get('/api/chats/unreadChatCount'), axios.get('/api/unreadMessages')])
                        .then(axios.spread((chats, messages) => {
                            console.log("HERE IS THE NAV SPREAD AXIOS CALL FOR CHATS AND MESSAGES");
                            console.log(chats);
                            console.log(messages);
                            setChatCount(chats.data.chatCount);
                            setMailCount(messages.data.messageCount);
                            console.log("END OF THE SPREAD AXIOS SHIT");
                        }))
                        .catch(err => console.log(err));
                } else {
                    setUser(null);
                    setUserId(null);
                }
                setDataFetched(true);

            })
            .catch(err => console.log(err));
    }, [userId]);

    if(dataFetched) {
        return(
            <Router>
                <div className="App">
                    <UserContext.Provider value ={{ user, setUser }}>
                        <NavAlertsContext.Provider value={{ mailCount, setMailCount, chatCount, setChatCount}}>
                            <Header />
                            <div className="mainContentContainer">
                                <Switch>
                                    <Route exact path="/" render={props => (
                                        <React.Fragment>
                                            <LandingPage />
                                        </React.Fragment>
                                    )} />
                                    <NoAuthRoute path="/signup" exact component={SignUp} />
                                    <NoAuthRoute path="/login" exact component={LogIn} />
                                    <ProtectedRoute path="/projects" exact component={Home} />
                                    <ProtectedRoute path="/projects/:projectID/:folders*" exact component = {ProjectHandler} />
                                    <ProtectedRoute path="/mail" exact component={MailBox} />
                                    <ProtectedRoute path="/mail/:mailId" exact component={MailItem} />
                                    <ProtectedRoute path="/chat" exact component={Chat} />
                                    <ProtectedRoute path="/profile" exact component={UserProfile} />
                                    <NotFoundPage />
                                </Switch>
                            </div>
                            <Footer />
                        </NavAlertsContext.Provider>
                    </UserContext.Provider>
                </div>
            </Router>
        );
    } else {
        return null;
    }
}


export default App;
