import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import  {MainContainer}   from "./mvp/MainContainer"
import  {LoginContainer}   from "./mvp/LoginContainer"
import  {WelcomeContainer} from "./mvp/WelcomeContainer"
import  {SocialLoginCallbacContainer} from "./mvp/FederatedLoginContainer"

const Routing = () => {
 
    return (
    <Router  >
        <Routes>
            <Route path="/" element={<MainContainer />} >
               <Route path="/login" element={<LoginContainer />} />
               <Route path="/welcome" element={<WelcomeContainer />} />
               <Route path="/socialCallBk" element={<SocialLoginCallbacContainer />} /> 
            </Route>
            
        </Routes>
    </Router>
    )
}
 

export default Routing