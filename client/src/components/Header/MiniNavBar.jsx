import "../../App.css";
import "./MiniNavBar.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import { LinkContainer } from "react-router-bootstrap";
// import Dobby from "../../resources/favicon-32x32.png";
// import { Container } from 'react-bootstrap';

function miniNavigationBar() {
  return (
    <Navbar  variant="dark" className="mini-bar">
      <Nav>
        <Nav.Link>Overview</Nav.Link>
        <Nav.Link>Pipeline</Nav.Link>
        <Nav.Link>Activity</Nav.Link>
        <Nav.Link>Issues</Nav.Link>
        <Nav.Link>Resources</Nav.Link>
        <Nav.Link>Settings</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default miniNavigationBar;
