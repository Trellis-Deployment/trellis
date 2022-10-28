import "../../App.css";
import "./MiniNavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function miniNavigationBar() {
  const handleActivityClick = (e) => {
    e.preventDefault();
    
  }
  return (
    <Navbar  variant="dark" className="mini-bar">
      <Nav>
        <Nav.Link>Overview</Nav.Link>
        <Nav.Link>Pipeline</Nav.Link>
        <Nav.Link onClick={handleActivityClick}>Activity</Nav.Link>
        <Nav.Link>Issues</Nav.Link>
        <Nav.Link>Resources</Nav.Link>
        <Nav.Link>Settings</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default miniNavigationBar;
