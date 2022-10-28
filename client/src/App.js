import React from "react";
import './index.css'
import './App.css';
import NavigationBar from "./components/Header/NavigationBar";
import { useState } from "react";
import Routes from "./components/Routes";
import { BrowserRouter as Router} from 'react-router-dom';
import MiniNavBar from "./components/Header/MiniNavBar";
import { AppContext } from "./Lib/AppContext";

function App() {
  const [ authUser, setAuthUser ] = useState(window.sessionStorage.getItem("trellisAuthUser"));
  const [ userId, setUserId ] = useState(window.sessionStorage.getItem("trellisUserId"));
  const [ appName, setAppName ] = useState(window.sessionStorage.getItem("trellisAppName"));
  const [ appId, setAppId ] = useState(window.sessionStorage.getItem("trellisAppId"));
  
  const contextValue = {
    appName,
    setAppName,
    appId,
    setAppId,
    authUser,
    setAuthUser,
    userId,
    setUserId
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("trellisAuthUser");
    window.sessionStorage.removeItem("trellisUserId");
    window.sessionStorage.removeItem("trellisAppName");
    window.sessionStorage.removeItem("trellisAppId");
    setAuthUser(undefined);
    setUserId(undefined);
    setAppId(undefined);
    setAppName(undefined);
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Router>
          <NavigationBar handleLogoutClick={handleLogoutClick}></NavigationBar>
          {appName ? 
            <MiniNavBar></MiniNavBar> :
            null
          }
          <Routes
          ></Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}


export default App;
