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
  const [ authUser, setAuthUser ] = useState(window.sessionStorage.getItem("authUser"));
  const [ userId, setUserId ] = useState(window.sessionStorage.getItem("trellisUserId"));
  const [ app, setApp ] = useState({});
  
  const contextValue = {
    app,
    setApp,
    authUser,
    setAuthUser,
    userId,
    setUserId
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("authUser");
    window.sessionStorage.removeItem("trellisUserId");
    setAuthUser(undefined);
    setUserId(undefined);
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Router>
          <NavigationBar authUser={authUser} setAuthUser={setAuthUser} handleLogoutClick={handleLogoutClick}></NavigationBar>
          {Object.keys(app).length !== 0 ? 
            <MiniNavBar></MiniNavBar> :
            null
          }
          <Routes
            userId={userId} setUserId={setUserId}
            authUser={authUser} setAuthUser={setAuthUser}
            handleLogoutClick={handleLogoutClick}
          ></Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}


export default App;
