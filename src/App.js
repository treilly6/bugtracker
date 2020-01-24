import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { NoAuthRoute } from './components/ProtectedRoutes/NoAuthRoute';

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

class App extends React.Component {
    state = {}

    componentDidMount() {}

    render() {
        return(
            <Router>
                <div className="App">
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
                </div>
            </Router>
        );
    }
}


export default App;
