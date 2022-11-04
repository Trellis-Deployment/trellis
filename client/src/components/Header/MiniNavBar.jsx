import "../../App.css";
import "./MiniNavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAppContext } from "../../Lib/AppContext";
import { LinkContainer } from "react-router-bootstrap";

function MiniNavigationBar() {
  const { appName } = useAppContext();

  return (
    <Navbar  variant="dark" className="mini-bar">
      <Nav>
        <LinkContainer to={`/application/${appName}`}>
          <Nav.Link>Overview</Nav.Link>
        </LinkContainer>
        <Nav.Link>Pipeline</Nav.Link>
        <LinkContainer to={`/application/${appName}/activity`}>
          <Nav.Link  >Activity</Nav.Link>
        </LinkContainer>
        {/* <Nav.Link>Issues</Nav.Link>
        <Nav.Link>Resources</Nav.Link> */}
        <LinkContainer to={`/application/${appName}/settings`}>
          <Nav.Link>Settings</Nav.Link>
        </LinkContainer> 
      </Nav>
    </Navbar>
  );
}

export default MiniNavigationBar;
