import React from "react";
import './index.css'
import './App.css';
import NavigationBar from "./components/Header/NavigationBar";
import { useState} from "react";
import Routes from "./components/Routes";
import { BrowserRouter as Router} from 'react-router-dom';


function App() {
  const [ authUser, setAuthUser ] = useState(window.sessionStorage.getItem("authUser"));

  const handleLogoutClick = (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("authUser");
    setAuthUser(undefined);
  };

  return (
    <div className="App">
      <Router>
        <NavigationBar authUser={authUser} setAuthUser={setAuthUser} handleLogoutClick={handleLogoutClick}></NavigationBar>
        <Routes authUser={authUser} setAuthUser={setAuthUser} handleLogoutClick={handleLogoutClick}></Routes>
      </Router>
    </div>
  );
}


export default App;
