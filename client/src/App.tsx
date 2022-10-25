import './index.css'
import './App.css';
import NavigationBar from "./components/Header/NavigationBar"
import { useState} from "react";
import Routes from "./components/Routes";


function App() {
  const [ authUser, setAuthUser ] = useState(window.sessionStorage.getItem("authUser"));

  const handleLogoutClick = (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem("authUser");
    setAuthUser(undefined);
  };

  return (
    <div className="App">
      <NavigationBar authUser={authUser} setAuthUser={setAuthUser} handleLogoutClick={handleLogoutClick}></NavigationBar>
      <Routes authUser={authUser} setAuthUser={setAuthUser} handleLogoutClick={handleLogoutClick}></Routes>
    </div>
  );
}


export default App;
