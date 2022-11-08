import "../../App.css";
import "./MiniNavBar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAppContext } from "../../Lib/AppContext";
import { LinkContainer } from "react-router-bootstrap";

function MiniNavigationBar() {
  const { appName } = useAppContext();

  return (
    <Navbar variant="dark" className="mini-bar">
      <Nav>
        <LinkContainer to={`/application/${appName}`}>
          <Nav.Link>Pipeline</Nav.Link>
        </LinkContainer>
        <LinkContainer to={`/application/${appName}/activity`}>
          <Nav.Link>Activity</Nav.Link>
        </LinkContainer>
        <LinkContainer to={`/application/${appName}/settings`}>
          <Nav.Link>Settings</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}

export default MiniNavigationBar;
